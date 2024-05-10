import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import {News} from './src/Screens/News/News';
import {Articles} from './src/Screens/Articles';

import NetInfo from '@react-native-community/netinfo';
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {MAIN_ROUTES} from './src/constants/routes';

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

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
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
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
