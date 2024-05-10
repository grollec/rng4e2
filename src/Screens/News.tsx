import {useQuery} from '@tanstack/react-query';
import {isArray} from 'lodash';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {isRawNews, parseRawNews} from '../parsers/news';
import {News as NewsType} from '../types/News';

const PER_PAGE = 20;
const PAGE = 1;
const OFFSET = 0;
const NEWS_QUERY_KEY = 'news';

function parseNewsResponse(data: unknown): NewsType[] {
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

export const News = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: [NEWS_QUERY_KEY],
    queryFn: fetchNews,
  });

  console.log(data);

  return (
    <View style={styles.container}>
      <Text>News</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
