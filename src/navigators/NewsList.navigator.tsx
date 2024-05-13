import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NEWS_ROUTES, NewsRoutesParamList} from '../constants/routes';
import {COLOR_MARINE} from '../constants/colors';
import {NewsList} from '../Screens/News/components/NewsList';

const Stack = createNativeStackNavigator<NewsRoutesParamList>();

export const NewsListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NEWS_ROUTES.list}
        component={NewsList}
        options={{
          headerShown: false,
          statusBarColor: COLOR_MARINE,
        }}
      />
    </Stack.Navigator>
  );
};
