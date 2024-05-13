import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ImageBackground, Linking, PixelRatio} from 'react-native';
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
  View,
  useWindowDimensions,
} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import RenderHTML, {MixedStyleDeclaration} from 'react-native-render-html';
import {isNaN} from 'lodash';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoutesParamsList} from '../../../constants/routes';
import {IconButton, useTheme} from 'react-native-paper';
import {COLOR_MARINE} from '../../../constants/colors';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';

const fallbackImg = require('../../../assets/images/fallback_pic.jpg');

const INJECTED_JAVASCRIPT =
  'window.ReactNativeWebView.postMessage(Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight))';
const pixelRatio = PixelRatio.get();

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
      const nextHeight = height / pixelRatio + 100;
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
  const titleStyles = useTitleStyles();
  const css = useCSS();

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
          <ImageBackground source={fallbackImg}>
            <Image source={{uri: article.img}} width={width} height={200} />
          </ImageBackground>
          <View style={styles.titleContainer}>
            <RenderHTML
              baseStyle={titleStyles}
              source={{html: article.title}}
              contentWidth={width}
            />
          </View>
          <Text variant="labelLarge">Par {article.author}</Text>
          <Text variant="labelMedium">
            {article.date.format('ddd DD MMM YYYY - HH:mm')}
          </Text>
          <Text variant="labelSmall">{article.categories?.join(' ')}</Text>
          <Divider style={styles.divider} />
          <View style={styles.webViewContainer}>
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

function useCSS() {
  const theme = useTheme();
  return `
  <style>
    html {
      font-size: ${18 * pixelRatio}px;
    }
    p {
      color: ${theme.colors.onPrimaryContainer};
      font-family: ${theme.fonts.bodyLarge.fontFamily};
      font-size: ${theme.fonts.bodyLarge.fontSize * pixelRatio}px;
      font-weight: ${theme.fonts.bodyLarge.fontWeight};
      line-height: ${theme.fonts.bodyLarge.lineHeight * pixelRatio}px;
      letter-spacing: ${theme.fonts.bodyLarge.letterSpacing};
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
}

function useTitleStyles(): MixedStyleDeclaration {
  const theme = useTheme();
  return {
    color: theme.colors.onPrimaryContainer,
    marginBottom: 8,
    textAlign: 'center',
    ...theme.fonts.headlineMedium,
  };
}

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
      alignItems: 'center',
      paddingTop: headerHeight,
      paddingBottom: BOTTOM_BAR_HEIGHT,
    },
    divider: {
      margin: 16,
      width: '80%',
    },
    webViewContainer: {
      flex: 1,
      width: '100%',
      padding: 16,
    },
    webView: {
      flex: 1,
      height: contentHeight,
    },
    titleContainer: {
      width: '80%',
      padding: 16,
      marginTop: -36,
      backgroundColor: theme.colors.background,
      color: theme.colors.primaryContainer,
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
