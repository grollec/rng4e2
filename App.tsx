import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {PaperProvider, adaptNavigationTheme} from 'react-native-paper';

import {News} from './src/Screens/News/News';
import {Articles} from './src/Screens/Articles';

import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import {AppState, AppStateStatus, Platform, useColorScheme} from 'react-native';
import {MAIN_ROUTES} from './src/constants/routes';
import {DARK_THEME, LIGHT_THEME} from './src/constants/colors';
import {Settings} from './src/Screens/Settings';

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

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  // Effect to refetch upon app focus
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  const isDarkTheme = useColorScheme() === 'dark';
  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationDark: DefaultTheme,
    reactNavigationLight: DefaultTheme,
    materialDark: DARK_THEME,
    materialLight: LIGHT_THEME,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
        <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
          <Tab.Navigator>
            <Tab.Screen
              name={MAIN_ROUTES.news}
              component={News}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name={MAIN_ROUTES.articles}
              component={Articles}
              options={{headerShown: false}}
            />
            <Tab.Screen name={MAIN_ROUTES.settings} component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
