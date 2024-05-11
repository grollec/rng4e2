import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {NewsList} from './components/NewsList';
import {NEWS_ROUTES, NewsRoutesParamsList} from '../../constants/routes';
import {NewsDetails} from './components/NewsDetails';
import {NewsHeader} from './components/NewsHeader';

const Stack = createNativeStackNavigator<NewsRoutesParamsList>();
const NAVIGATOR_ID = 'news-stack-navigator';
export type NewsNativeStackScreenProps = NativeStackScreenProps<
  NewsRoutesParamsList,
  'news-details',
  'news-stack-navigator'
>;

export const News = () => {
  return (
    <Stack.Navigator id={NAVIGATOR_ID} screenOptions={{header: NewsHeader}}>
      <Stack.Screen name={NEWS_ROUTES.list} component={NewsList} />
      <Stack.Screen name={NEWS_ROUTES.details} component={NewsDetails} />
    </Stack.Navigator>
  );
};
