import {NavigationContainer} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {PaperProvider} from 'react-native-paper';

import {useColorScheme} from 'react-native';
import {DARK_THEME, LIGHT_THEME} from '../constants/colors';
import 'dayjs/locale/fr';
import {MainNavigator} from '../navigators/MainNavigator';
import {useSettingsQuery} from '../hooks/useSettings';

function Main(): React.JSX.Element {
  const {data: settings} = useSettingsQuery();
  const colorScheme = useColorScheme();
  const isDarkTheme = useMemo(() => {
    if (settings) {
      const {activeTheme} = settings;
      if (activeTheme === 'system') {
        return colorScheme === 'dark';
      }
      return activeTheme === 'dark';
    }
  }, [colorScheme, settings]);

  return (
    <PaperProvider theme={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;
