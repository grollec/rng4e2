import {useQuery} from '@tanstack/react-query';
import {isArray} from 'lodash';
import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  VirtualizedListProps,
} from 'react-native';
import {isRawNews, parseRawNews} from '../parsers/news';
import {Article} from '../types/Article';

const PER_PAGE = 20;
const PAGE = 1;
const OFFSET = 0;
const NEWS_QUERY_KEY = 'news';

function parseNewsResponse(data: unknown): Article[] {
  if (isArray(data)) {
    return data.filter(isRawNews).map(parseRawNews);
  }
  return [];
}

async function fetchNews() {
  const res = await fetch(
    `https://www.girondins4ever.com/wp-json/wp/v2/breves?per_page=${PER_PAGE}&page=${PAGE}&offset=${OFFSET}`,
    {},
  );
  const rawNews = await res.json();
  return parseNewsResponse(rawNews);
}

const Item = ({article}: {article: Article}) => {
  const {id, title, excerpt} = article;
  return (
    <View key={id}>
      <Text>{title}</Text>
      <Text>{excerpt}</Text>
    </View>
  );
};

function getItem(data: Article[], index: number) {
  return data[index];
}

function getItemCount(data: Article[]) {
  return data.length;
}

export const News = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: [NEWS_QUERY_KEY],
    queryFn: fetchNews,
    placeholderData: [],
  });

  console.log(data);

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList<Article>
        initialNumToRender={PER_PAGE}
        renderItem={item => <Item article={item.item} />}
        data={data}
        getItem={getItem}
        getItemCount={getItemCount}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
