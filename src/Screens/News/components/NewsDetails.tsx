import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Linking, PixelRatio} from 'react-native';
import {WebView} from 'react-native-webview';
import {useHeaderHeight} from '@react-navigation/elements';
import {InfiniteData, keepPreviousData, useQuery} from '@tanstack/react-query';
import {Article} from '../../../types/Article';
import {NEWS_QUERY_KEY} from '../../../services/api';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {isNaN} from 'lodash';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesParamsList} from '../../../constants/routes';
import {IconButton, useTheme} from 'react-native-paper';
import {COLOR_MARINE} from '../../../constants/colors';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';

const INJECTED_JAVASCRIPT =
  'window.ReactNativeWebView.postMessage(Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight))';

type NewsNativeStackScreenProps = NativeStackScreenProps<
  RoutesParamsList,
  'news-details'
>;
export const NewsDetails = ({
  route,
  navigation,
}: NewsNativeStackScreenProps) => {
  const webViewRef = useRef<WebView>(null);
  const articleId = route.params.articleId;
  const {data} = useQuery<InfiniteData<Article[]>>({
    queryKey: [NEWS_QUERY_KEY],
    placeholderData: keepPreviousData,
  });

  const article = useMemo(
    () => data?.pages.flat().find(a => a.id === articleId),
    [articleId, data?.pages],
  );

  const {width} = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState(0);
  const handleJSMessage = useCallback((height: number) => {
    if (!isNaN(height)) {
      // Scales to proper height using PixelRatio and gives it some
      // extra to ensure content will fit.
      const nextHeight = height / PixelRatio.get() + 100;
      setContentHeight(nextHeight);
    }
  }, []);

  const handleShouldStartLoadWithRequest = useCallback(
    (event: ShouldStartLoadRequest) => {
      if (!/^[data:text, about:blank]/.test(event.url)) {
        Linking.openURL(event.url);
        return false;
      }
      return true;
    },
    [],
  );

  const styles = useStyles({contentHeight});

  if (!article) {
    return (
      <View style={styles.notFoundContainer}>
        <Text>Article not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.articleContainer}>
      <ScrollView style={styles.flexOne}>
        <View style={styles.contentContainer}>
          <RenderHTML
            baseStyle={titleStyles}
            source={{html: article.title}}
            contentWidth={width}
          />
          <Image source={{uri: article.img}} width={width - 16} height={200} />
          <WebView
            ref={webViewRef}
            source={{html: `${css}${article.content}`}}
            originWhitelist={['*']}
            style={styles.webView}
            onMessage={m => {
              handleJSMessage(Number(m.nativeEvent.data));
            }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            allowsFullscreenVideo
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <IconButton
          icon="close"
          iconColor={COLOR_MARINE}
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

const css = `
  <style>
    html {
      font-size: 18px;
    }
    p {
      font-size: 2rem;
    }
    .aligncenter,
    .twitter-tweet,
    iframe {
      display:block;
      margin:0 auto 20px;
      clear:both
    }
    figure,
    img {
      max-width: 100%;
      height: auto;
    }
    </style>
  \n
`;

const titleStyles = {
  fontSize: 22,
  fontWeight: 700 as const,
  marginBottom: 8,
};

const BOTTOM_BAR_HEIGHT = 50;

function useStyles({contentHeight}: {contentHeight: number}) {
  const headerHeight = useHeaderHeight();
  const theme = useTheme();
  return StyleSheet.create({
    articleContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flexOne: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      paddingTop: headerHeight,
      paddingBottom: BOTTOM_BAR_HEIGHT,
      padding: 8,
    },
    webView: {
      flex: 1,
      height: contentHeight,
    },
    notFoundContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: theme.colors.background,
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.outlineVariant,
      height: BOTTOM_BAR_HEIGHT,
    },
  });
}
