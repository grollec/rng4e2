import {NavigationContainer} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {PaperProvider} from 'react-native-paper';

import {useColorScheme} from 'react-native';
import {DARK_THEME, LIGHT_THEME} from '../constants/colors';
import 'dayjs/locale/fr';
import {MainNavigator} from '../navigators/MainNavigator';
import {useSettingsQuery} from '../hooks/useSettings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppErrorBoundary} from './AppErrorBoundary';
import {ErrorFallback} from './ErrorFallback';

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
        <AppErrorBoundary fallback={<ErrorFallback />}>
          <SafeAreaProvider>
            <MainNavigator />
          </SafeAreaProvider>
        </AppErrorBoundary>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;
