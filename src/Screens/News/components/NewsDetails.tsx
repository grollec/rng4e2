import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Linking, PixelRatio, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import {useHeaderHeight} from '@react-navigation/elements';
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
import {AppRoutesParamsList} from '../../../constants/routes';
import {useTheme} from 'react-native-paper';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';
import {useArticle} from '../../../hooks/useArticle';
import {
  ArticleBottomBar,
  BOTTOM_BAR_HEIGHT,
} from '../../../components/ArticleBottomBar';

const fallbackImg = require('../../../assets/images/fallback_pic.jpg');

const INJECTED_JAVASCRIPT =
  'window.ReactNativeWebView.postMessage(Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight))';
const pixelRatio = PixelRatio.get();

type NewsNativeStackScreenProps = NativeStackScreenProps<
  AppRoutesParamsList,
  'news-details'
>;
export const NewsDetails = ({route}: NewsNativeStackScreenProps) => {
  const webViewRef = useRef<WebView>(null);
  const articleId = route.params.articleId;
  const article = useArticle(articleId);

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
  const imgSource = useMemo(
    () => (article?.img ? {uri: article.img} : fallbackImg),
    [article?.img],
  );
  if (!article) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text>Article not found</Text>
        <ArticleBottomBar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.articleContainer}>
      <ScrollView style={styles.flexOne}>
        <View style={styles.contentContainer}>
          <Image
            source={imgSource}
            width={width}
            height={200}
            style={styles.img}
            resizeMode="cover"
          />
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
      <ArticleBottomBar article={article} />
    </SafeAreaView>
  );
};

const isIOS = Platform.OS === 'ios';
function useCSS() {
  const theme = useTheme();

  return `
  <style>
    html {
      font-size: ${18 * pixelRatio}px;
      background-color: ${theme.colors.background}
    }
    p {
      color: ${theme.colors.onPrimaryContainer};
      font-family: ${
        isIOS ? 'San Francisco' : theme.fonts.bodyLarge.fontFamily
      };
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
      min-width: 100%;
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

function useStyles({contentHeight}: {contentHeight: number}) {
  const headerHeight = useHeaderHeight();
  const {height} = useWindowDimensions();
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
    img: {
      height: height * 0.4,
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
  });
}
