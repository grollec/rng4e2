import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  FEATURE_ARTICLES_ROUTES,
  FeatureArticlesParamList,
} from '../constants/routes';
import {COLOR_BORDEAUX} from '../constants/colors';
import {FeatureArticlesList} from '../Screens/Articles/components/FeatureArticlesList';

const Stack = createNativeStackNavigator<FeatureArticlesParamList>();

export const FeatureArticleListNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FEATURE_ARTICLES_ROUTES.list}
        component={FeatureArticlesList}
        options={{
          headerShown: false,
          statusBarColor: COLOR_BORDEAUX,
        }}
      />
    </Stack.Navigator>
  );
};
