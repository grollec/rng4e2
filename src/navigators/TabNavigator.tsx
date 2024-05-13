import React from 'react';
import {MAIN_ROUTES, NEWS_ROUTES} from '../constants/routes';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Articles} from '../Screens/Articles';
import {useTheme} from 'react-native-paper';
import {NewsList} from '../Screens/News/components/NewsList';
import {SettingsNavigator} from './Settings.navigator';

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
        name={NEWS_ROUTES.list}
        component={NewsList}
        options={{
          tabBarIcon: 'newspaper-variant-multiple-outline',
          title: 'Brève',
        }}
      />
      <Tab.Screen
        name={MAIN_ROUTES.articles}
        component={Articles}
        options={{tabBarIcon: 'newspaper-variant-outline', title: 'Articles'}}
      />
      <Tab.Screen
        name={MAIN_ROUTES.settings}
        component={SettingsNavigator}
        options={{tabBarIcon: 'cogs', title: 'Paramètres'}}
      />
    </Tab.Navigator>
  );
};
