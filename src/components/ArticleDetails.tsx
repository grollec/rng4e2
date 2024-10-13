import React, {useCallback, useMemo, useState} from 'react';
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
import {Button, Divider, Text} from 'react-native-paper';
import RenderHTML, {MixedStyleDeclaration} from 'react-native-render-html';
import {isNaN} from 'lodash';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from 'react-native-paper';
import {AppRoutesParamsList, MAIN_ROUTES} from '../constants/routes';
import {useArticle} from '../hooks/useArticle';
import {useNavigation} from '@react-navigation/native';
import {useHandleShouldStartLoadWithRequest} from '../hooks/useHandleShouldStartLoadWithRequest';
import {useArticleWebViewCSS} from '../hooks/useArticleWebViewCSS';
import {ListLoader} from './ListLoader';
import {ArticleBottomBar, BOTTOM_BAR_HEIGHT} from './ArticleBottomBar';

const fallbackImg = require('../assets/images/fallback_pic.jpg');

const INJECTED_JAVASCRIPT =
  'window.ReactNativeWebView.postMessage(Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight))';

type NewsNativeStackScreenProps = NativeStackScreenProps<
  AppRoutesParamsList,
  'details'
>;
export const ArticleDetails = ({route}: NewsNativeStackScreenProps) => {
  const articleId = route.params.articleId;
  const articleType = route.params.articleType;
  const {
    data: article,
    isLoading,
    isError,
  } = useArticle(articleType, articleId);

  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [contentHeight, setContentHeight] = useState(0);
  const handleJSMessage = useCallback((height: number) => {
    if (!isNaN(height)) {
      // Scales to proper height using PixelRatio and gives it some
      // extra to ensure content will fit.
      const nextHeight = height;
      setContentHeight(nextHeight);
    }
  }, []);

  const [isLoadingWebviewContent, setIsLoadingWebViewContent] = useState(false);

  const handleShouldStartLoadWithRequest =
    useHandleShouldStartLoadWithRequest(articleType);

  const styles = useStyles({contentHeight});
  const titleStyles = useTitleStyles();
  const css = useArticleWebViewCSS();
  const imgSource = useMemo(
    () => (article?.img ? {uri: article.img} : fallbackImg),
    [article?.img],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <ListLoader />
        <ArticleBottomBar />
      </SafeAreaView>
    );
  }

  if (isError && !article) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text variant="bodyLarge">
          Une erreur est survenue pendant le chargement de l’article
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate(MAIN_ROUTES.home)}>
          Revenir à l’accueil
        </Button>
        <ArticleBottomBar />
      </SafeAreaView>
    );
  }

  if (!article) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text variant="bodyLarge">L’article n’a pas pu être chargé.</Text>
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
          {isLoadingWebviewContent ? <ListLoader /> : null}
          <View style={styles.webViewContainer}>
            <WebView
              onLoadStart={() => setIsLoadingWebViewContent(true)}
              onLoadEnd={() => setIsLoadingWebViewContent(false)}
              source={{
                html: `${css}<a href="https://girondins4ever.com/?p=523621">GO GO</a>${article.content}`,
              }}
              originWhitelist={['*']}
              style={styles.webView}
              onMessage={m => {
                handleJSMessage(Number(m.nativeEvent.data));
              }}
              injectedJavaScript={INJECTED_JAVASCRIPT}
              allowsFullscreenVideo
              onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>
      <ArticleBottomBar article={article} />
    </SafeAreaView>
  );
};

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
      backgroundColor: theme.colors.background,
      gap: 8,
    },
  });
}
