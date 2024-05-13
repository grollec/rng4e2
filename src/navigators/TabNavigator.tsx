import React from 'react';
import {MAIN_ROUTES} from '../constants/routes';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {useTheme} from 'react-native-paper';
import {SettingsNavigator} from './Settings.navigator';
import {FeatureArticleListNavigator} from './FeatureArticlesList.navigator';
import {NewsListNavigator} from './NewsList.navigator';

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
        component={NewsListNavigator}
        options={{
          tabBarIcon: 'newspaper-variant-multiple-outline',
          title: 'Brève',
        }}
      />
      <Tab.Screen
        name={MAIN_ROUTES.featureArticles}
        component={FeatureArticleListNavigator}
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
