import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MAIN_ROUTES, NEWS_ROUTES, RoutesParamsList} from '../constants/routes';
import {NewsDetails} from '../Screens/News/components/NewsDetails';
import {COLOR_MARINE, COLOR_WHITE} from '../constants/colors';
import {TabNavigator} from './TabNavigator';

const Stack = createNativeStackNavigator<RoutesParamsList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={MAIN_ROUTES.news} component={TabNavigator} />
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
