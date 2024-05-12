import {keepPreviousData, useInfiniteQuery} from '@tanstack/react-query';
import React, {useCallback, useMemo, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, VirtualizedList} from 'react-native';
import {Article} from '../../../types/Article';
import {COLOR_WHITE} from '../../../constants/colors';
import {Item} from '../components/Item';
import {useNavigation} from '@react-navigation/native';
import {NEWS_ROUTES} from '../../../constants/routes';
import {NEWS_QUERY_KEY, fetchNews} from '../../../services/api';

const PER_PAGE = 20;
const INITIAL_PAGE = 0;

function getItem(data: Article[], index: number) {
  return data[index];
}

function getItemCount(data?: Article[]) {
  return data?.length || 0;
}

export const NewsList = () => {
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

  const news = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data?.pages]);

  const navigation = useNavigation();
  const onItemPress = useCallback(
    (id: number) => {
      navigation.navigate(NEWS_ROUTES.details, {
        articleId: id,
      });
    },
    [navigation],
  );

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList<Article>
        initialNumToRender={PER_PAGE}
        renderItem={item => <Item onPress={onItemPress} article={item.item} />}
        keyExtractor={item => item.id.toString()}
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
    backgroundColor: COLOR_WHITE,
  },
});
