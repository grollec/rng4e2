import {
  MD3LightTheme as DefaultLightTheme,
  MD3DarkTheme as DefaultDarkTheme,
} from 'react-native-paper';

export const COLOR_BLACK = '#000000';
export const COLOR_WHITE = '#FFFFFF';
export const COLOR_MARINE = '#101F45';
export const COLOR_BORDEAUX = '#6d071a';
export const COLOR_IRON = '#465b65';

const LIGHT_THEME_COLORS = {
  primary: 'rgb(61, 91, 169)',
  onPrimary: 'rgb(255, 255, 255)',
  primaryContainer: 'rgb(219, 225, 255)',
  onPrimaryContainer: 'rgb(0, 23, 74)',
  secondary: 'rgb(167, 54, 64)',
  onSecondary: 'rgb(255, 255, 255)',
  secondaryContainer: 'rgb(255, 218, 217)',
  onSecondaryContainer: 'rgb(64, 0, 10)',
  tertiary: 'rgb(0, 104, 116)',
  onTertiary: 'rgb(255, 255, 255)',
  tertiaryContainer: 'rgb(151, 240, 255)',
  onTertiaryContainer: 'rgb(0, 31, 36)',
  error: 'rgb(186, 26, 26)',
  onError: 'rgb(255, 255, 255)',
  errorContainer: 'rgb(255, 218, 214)',
  onErrorContainer: 'rgb(65, 0, 2)',
  background: 'rgb(254, 251, 255)',
  onBackground: 'rgb(27, 27, 31)',
  surface: 'rgb(254, 251, 255)',
  onSurface: 'rgb(27, 27, 31)',
  surfaceVariant: 'rgb(226, 226, 236)',
  onSurfaceVariant: 'rgb(69, 70, 79)',
  outline: 'rgb(117, 118, 128)',
  outlineVariant: 'rgb(197, 198, 208)',
  shadow: 'rgb(0, 0, 0)',
  scrim: 'rgb(0, 0, 0)',
  inverseSurface: 'rgb(48, 48, 52)',
  inverseOnSurface: 'rgb(242, 240, 244)',
  inversePrimary: 'rgb(179, 197, 255)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(244, 243, 251)',
    level2: 'rgb(239, 238, 248)',
    level3: 'rgb(233, 233, 246)',
    level4: 'rgb(231, 232, 245)',
    level5: 'rgb(227, 229, 243)',
  },
  surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
  onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
  backdrop: 'rgba(46, 48, 56, 0.4)',
};
export const LIGHT_THEME = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    ...LIGHT_THEME_COLORS,
  },
};

const DARK_THEME_COLORS = {
  primary: 'rgb(179, 197, 255)',
  onPrimary: 'rgb(0, 42, 118)',
  primaryContainer: 'rgb(34, 66, 144)',
  onPrimaryContainer: 'rgb(219, 225, 255)',
  secondary: 'rgb(255, 179, 180)',
  onSecondary: 'rgb(103, 2, 22)',
  secondaryContainer: 'rgb(135, 30, 42)',
  onSecondaryContainer: 'rgb(255, 218, 217)',
  tertiary: 'rgb(79, 216, 235)',
  onTertiary: 'rgb(0, 54, 61)',
  tertiaryContainer: 'rgb(0, 79, 88)',
  onTertiaryContainer: 'rgb(151, 240, 255)',
  error: 'rgb(255, 180, 171)',
  onError: 'rgb(105, 0, 5)',
  errorContainer: 'rgb(147, 0, 10)',
  onErrorContainer: 'rgb(255, 180, 171)',
  background: 'rgb(27, 27, 31)',
  onBackground: 'rgb(228, 226, 230)',
  surface: 'rgb(27, 27, 31)',
  onSurface: 'rgb(228, 226, 230)',
  surfaceVariant: 'rgb(69, 70, 79)',
  onSurfaceVariant: 'rgb(197, 198, 208)',
  outline: 'rgb(143, 144, 154)',
  outlineVariant: 'rgb(69, 70, 79)',
  shadow: 'rgb(0, 0, 0)',
  scrim: 'rgb(0, 0, 0)',
  inverseSurface: 'rgb(228, 226, 230)',
  inverseOnSurface: 'rgb(48, 48, 52)',
  inversePrimary: 'rgb(61, 91, 169)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(35, 36, 42)',
    level2: 'rgb(39, 41, 49)',
    level3: 'rgb(44, 46, 56)',
    level4: 'rgb(45, 47, 58)',
    level5: 'rgb(48, 51, 62)',
  },
  surfaceDisabled: 'rgba(228, 226, 230, 0.12)',
  onSurfaceDisabled: 'rgba(228, 226, 230, 0.38)',
  backdrop: 'rgba(46, 48, 56, 0.4)',
};
export const DARK_THEME = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    ...DARK_THEME_COLORS,
  },
};
