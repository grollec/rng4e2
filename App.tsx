import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';

import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import {AppState, AppStateStatus, Platform, useColorScheme} from 'react-native';
import {DARK_THEME, LIGHT_THEME} from './src/constants/colors';
import {TabNavigator} from './src/navigators/TabNavigator';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';

dayjs.locale('fr');

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  // Effect to refetch upon app focus
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  const isDarkTheme = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
