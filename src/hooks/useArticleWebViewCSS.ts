import {PixelRatio, Platform} from 'react-native';
import {useTheme} from 'react-native-paper';

const isIOS = Platform.OS === 'ios';
const fontScale = PixelRatio.getFontScale();

export function useArticleWebViewCSS() {
  const theme = useTheme();
  return `
  <head>
    <meta name="viewport" content="width=device-width initial-scale=1" />
  </head>
  <style>
    * {
      font-size: ${16 * fontScale}px;
      font-family: ${
        isIOS
          ? '"Optimistic Display",system-ui,-apple-system,sans-serif'
          : theme.fonts.bodyLarge.fontFamily
      };
      line-height: ${24 * fontScale}px;
      letter-spacing: ${theme.fonts.bodyLarge.letterSpacing};
    }
    html {
      background-color: ${theme.colors.background}
    }
    p {
      font-weight: ${theme.fonts.bodyLarge.fontWeight};
      color: ${theme.colors.onPrimaryContainer};
    }
    .aligncenter,
    .twitter-tweet,
    iframe {
      display:block;
      margin:0 auto 20px;
      clear:both;
      max-width: 100%;
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
