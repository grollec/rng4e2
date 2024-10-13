import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';
import {ArticleType} from '../services/api';
import {MAIN_ROUTES} from '../constants/routes';

const ARTICLE_DETAILS_BASE_URL = 'girondins4ever.com/';

export function useHandleShouldStartLoadWithRequest(articleType: ArticleType) {
  const navigation = useNavigation();
  return function (event: ShouldStartLoadRequest) {
    if (event.url.includes(ARTICLE_DETAILS_BASE_URL)) {
      const strs = event.url.split('?p=');
      const maybeId = Number(strs[1]);
      if (!isNaN(maybeId)) {
        navigation.navigate(MAIN_ROUTES.details, {
          articleId: maybeId,
          articleType: articleType,
        });
      }
    } else if (
      !/^[data:text, about:blank]/.test(event.url) &&
      event.navigationType === 'click'
    ) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  };
}
