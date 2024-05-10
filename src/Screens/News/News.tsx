import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {NewsList} from './components/NewsList';
import {NEWS_ROUTES} from '../../constants/routes';

const Stack = createNativeStackNavigator();

const NewsDetails = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Details</Text>
    </View>
  );
};

export const News = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NEWS_ROUTES.list} component={NewsList} />
      <Stack.Screen name={NEWS_ROUTES.details} component={NewsDetails} />
    </Stack.Navigator>
  );
};
