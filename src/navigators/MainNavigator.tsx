import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  MAIN_ROUTES,
  NEWS_ROUTES,
  AppRoutesParamsList,
} from '../constants/routes';
import {NewsDetails} from '../Screens/News/components/NewsDetails';
import {COLOR_MARINE} from '../constants/colors';
import {TabNavigator} from './TabNavigator';

const Stack = createNativeStackNavigator<AppRoutesParamsList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MAIN_ROUTES.news}
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
    </Stack.Navigator>
  );
};
