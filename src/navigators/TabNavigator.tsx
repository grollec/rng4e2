import React from 'react';
import {MAIN_ROUTES} from '../constants/routes';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {News} from '../Screens/News/News';
import {Articles} from '../Screens/Articles';
import {Settings} from '../Screens/Settings';
import {useTheme} from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      barStyle={{backgroundColor: theme.colors.background}}
      activeColor={theme.colors.onPrimaryContainer}
      inactiveColor={theme.colors.primary}
      activeIndicatorStyle={{backgroundColor: theme.colors.primaryContainer}}>
      <Tab.Screen
        name={MAIN_ROUTES.news}
        component={News}
        options={{
          tabBarIcon: 'newspaper-variant-multiple-outline',
        }}
      />
      <Tab.Screen
        name={MAIN_ROUTES.articles}
        component={Articles}
        options={{tabBarIcon: 'newspaper-variant-outline'}}
      />
      <Tab.Screen
        name={MAIN_ROUTES.settings}
        component={Settings}
        options={{tabBarIcon: 'cogs'}}
      />
    </Tab.Navigator>
  );
};
