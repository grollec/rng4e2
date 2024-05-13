import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MAIN_ROUTES, NEWS_ROUTES, RoutesParamsList} from '../constants/routes';
import {NewsDetails} from '../Screens/News/components/NewsDetails';
import {COLOR_MARINE, COLOR_WHITE} from '../constants/colors';
import {TabNavigator} from './TabNavigator';

const Stack = createNativeStackNavigator<RoutesParamsList>();
const NAVIGATOR_ID = 'main-stack-navigator';

export const MainNavigator = () => {
  return (
    <Stack.Navigator id={NAVIGATOR_ID}>
      <Stack.Screen name={MAIN_ROUTES.news} component={TabNavigator} />
      <Stack.Screen
        name={NEWS_ROUTES.details}
        component={NewsDetails}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          title: '',
          headerTransparent: true,
          statusBarColor: COLOR_MARINE,
          headerTintColor: COLOR_WHITE,
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
