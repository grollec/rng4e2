import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  MAIN_ROUTES,
  NEWS_ROUTES,
  AppRoutesParamsList,
  FEATURE_ARTICLES_ROUTES,
} from '../constants/routes';
import {NewsDetails} from '../Screens/News/components/NewsDetails';
import {COLOR_BORDEAUX, COLOR_MARINE} from '../constants/colors';
import {TabNavigator} from './TabNavigator';
import {FeaturedArticleDetails} from '../Screens/Articles/components/FeaturedArticleDetails';

const Stack = createNativeStackNavigator<AppRoutesParamsList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MAIN_ROUTES.home}
        component={TabNavigator}
        options={{
          statusBarColor: COLOR_MARINE,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={NEWS_ROUTES.details}
        component={NewsDetails}
        options={{
          headerShown: false,
          statusBarColor: COLOR_MARINE,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={FEATURE_ARTICLES_ROUTES.details}
        component={FeaturedArticleDetails}
        options={{
          headerShown: false,
          statusBarColor: COLOR_BORDEAUX,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
