import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MAIN_ROUTES, AppRoutesParamsList} from '../constants/routes';
import {COLOR_MARINE} from '../constants/colors';
import {TabNavigator} from './TabNavigator';
import {ArticleDetails} from '../components/ArticleDetails';

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
        name={MAIN_ROUTES.details}
        component={ArticleDetails}
        options={{
          headerShown: false,
          statusBarColor: COLOR_MARINE,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
