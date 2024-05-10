import {keepPreviousData, useInfiniteQuery} from '@tanstack/react-query';
import {isArray} from 'lodash';
import React, {useMemo, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import {isRawNews, parseRawNews} from '../parsers/news';
import {Article} from '../types/Article';

const PER_PAGE = 20;
const INITIAL_PAGE = 0;
const NEWS_QUERY_KEY = 'news';

function parseNewsResponse(data: unknown): Article[] {
  if (isArray(data)) {
    return data.filter(isRawNews).map(parseRawNews);
  }
  return [];
}

async function fetchNews({pageParam}: {pageParam: number}) {
  const res = await fetch(
    `https://www.girondins4ever.com/wp-json/wp/v2/breves?per_page=${PER_PAGE}&offset=${
      pageParam * PER_PAGE
    }`,
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

function getItemCount(data?: Article[]) {
  return data?.length || 0;
}

export const News = () => {
  const [showLoadMore, setShowLoadMore] = useState(false);
  const {
    data,
    refetch,
    isRefetching,
    isPlaceholderData,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [NEWS_QUERY_KEY],
    queryFn: fetchNews,
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    placeholderData: keepPreviousData,
  });

  console.log(data);

  const news = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data?.pages]);

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList<Article>
        initialNumToRender={PER_PAGE}
        renderItem={item => <Item article={item.item} />}
        data={news}
        getItem={getItem}
        getItemCount={getItemCount}
        onRefresh={refetch}
        refreshing={isRefetching}
        onEndReached={() => setShowLoadMore(true)}
      />
      {showLoadMore && !isPlaceholderData ? (
        <Button
          disabled={isFetchingNextPage}
          onPress={() => fetchNextPage()}
          title="Load more"
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
