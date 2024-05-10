import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {Image, ScrollView, Text, View, useWindowDimensions} from 'react-native';
import {NEWS_QUERY_KEY, NewsList} from './components/NewsList';
import {NEWS_ROUTES, NewsRoutesParamsList} from '../../constants/routes';
import {InfiniteData, useQuery} from '@tanstack/react-query';
import {Article} from '../../types/Article';
import RenderHTML from 'react-native-render-html';

const Stack = createNativeStackNavigator();
const NAVIGATOR_ID = 'news-stack-navigator';

type Props = NativeStackScreenProps<
  NewsRoutesParamsList,
  'news-details',
  'news-stack-navigator'
>;
const NewsDetails = ({route}: Props) => {
  const articleId = route.params.articleId;
  const {data} = useQuery<InfiniteData<Article[]>>({
    queryKey: [NEWS_QUERY_KEY],
  });

  const article = useMemo(
    () => data?.pages.flat().find(a => a.id === articleId),
    [articleId, data?.pages],
  );

  const {width} = useWindowDimensions();

  if (!article) {
    return (
      <View style={{flex: 1}}>
        <Text>Article not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, padding: 8}}>
      <RenderHTML source={{html: article.title}} contentWidth={width} />
      <Image source={{uri: article.img}} width={width - 16} height={200} />
      <RenderHTML source={{html: article.content}} contentWidth={width} />
    </ScrollView>
  );
};

export const News = () => {
  return (
    <Stack.Navigator id={NAVIGATOR_ID}>
      <Stack.Screen name={NEWS_ROUTES.list} component={NewsList} />
      <Stack.Screen name={NEWS_ROUTES.details} component={NewsDetails} />
    </Stack.Navigator>
  );
};
