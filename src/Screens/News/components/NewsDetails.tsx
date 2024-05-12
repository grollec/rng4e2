import React, {useCallback, useMemo, useState} from 'react';
import {PixelRatio} from 'react-native';
import {WebView} from 'react-native-webview';
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
import {NewsNativeStackScreenProps} from '../News';
import {isNaN} from 'lodash';

const INJECTED_JAVASCRIPT =
  'window.ReactNativeWebView.postMessage(Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight))';

export const NewsDetails = ({route}: NewsNativeStackScreenProps) => {
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
        <View style={styles.flexOne}>
          <RenderHTML
            baseStyle={titleStyles}
            source={{html: article.title}}
            contentWidth={width}
          />
          <Image source={{uri: article.img}} width={width - 16} height={200} />
          <WebView
            source={{html: `${css}${article.content}`}}
            originWhitelist={['*']}
            style={styles.webView}
            onMessage={m => {
              handleJSMessage(Number(m.nativeEvent.data));
            }}
            injectedJavaScript={INJECTED_JAVASCRIPT}
          />
        </View>
      </ScrollView>
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

function useStyles({contentHeight}: {contentHeight: number}) {
  return StyleSheet.create({
    articleContainer: {
      flex: 1,
      padding: 8,
    },
    flexOne: {
      flex: 1,
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
  });
}
