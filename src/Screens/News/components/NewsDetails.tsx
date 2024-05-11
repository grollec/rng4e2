import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {NewsRoutesParamsList} from '../../../constants/routes';
import {InfiniteData, useQuery} from '@tanstack/react-query';
import {Article} from '../../../types/Article';
import {NEWS_QUERY_KEY} from '../../../services/api';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

type Props = NativeStackScreenProps<
  NewsRoutesParamsList,
  'news-details',
  'news-stack-navigator'
>;
export const NewsDetails = ({route}: Props) => {
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
      <View style={styles.notFoundContainer}>
        <Text>Article not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.articleContainer}>
      <ScrollView>
        <RenderHTML
          baseStyle={titleStyles}
          source={{html: article.title}}
          contentWidth={width}
        />
        <Image source={{uri: article.img}} width={width - 16} height={200} />
        <RenderHTML source={{html: article.content}} contentWidth={width} />
      </ScrollView>
    </SafeAreaView>
  );
};

const titleStyles = {
  fontSize: 22,
  fontWeight: 700 as const,
  marginBottom: 8,
};

const styles = StyleSheet.create({
  articleContainer: {
    flex: 1,
    padding: 8,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
