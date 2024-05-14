import {Linking} from 'react-native';
import {ShouldStartLoadRequest} from 'react-native-webview/lib/WebViewTypes';

export function useHandleShouldStartLoadWithRequest() {
  return function (event: ShouldStartLoadRequest) {
    if (
      !/^[data:text, about:blank]/.test(event.url) &&
      event.navigationType === 'click'
    ) {
      Linking.openURL(event.url);
      return false;
    }
    return true;
  };
}
