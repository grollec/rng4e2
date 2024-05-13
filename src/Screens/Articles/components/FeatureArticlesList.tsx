import {keepPreviousData, useInfiniteQuery} from '@tanstack/react-query';
import React, {useCallback, useMemo} from 'react';
import {
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  VirtualizedList,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Article} from '../../../types/Article';
import {COLOR_BORDEAUX, COLOR_WHITE} from '../../../constants/colors';
import {Item} from '../components/Item';
import {useNavigation} from '@react-navigation/native';
import {FEATURE_ARTICLES_ROUTES} from '../../../constants/routes';
import {
  FEATURE_ARTICLES_QUERY_KEY,
  fetchFeatureArticles,
} from '../../../services/api';
import {MainItem} from './MainItem';
import {FetchError} from '../../FetchError';
import {FocusAwareStatusBar} from '../../../components/FocusAwareStatusBar';
import {ListLoader} from '../../../components/ListLoader';

const PER_PAGE = 20;
const INITIAL_PAGE = 0;

function getItem(data: Article[], index: number) {
  return data[index];
}

function getItemCount(data?: Article[]) {
  return (data?.length || 0) + 1;
}

export const FeatureArticlesList = () => {
  const {
    data,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
    isPlaceholderData,
    isError,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [FEATURE_ARTICLES_QUERY_KEY],
    queryFn: fetchFeatureArticles,
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    placeholderData: keepPreviousData,
  });

  const shouldShowError = useMemo(
    () =>
      isError &&
      !(isRefetching || isLoading || isFetchingNextPage || isFetching),
    [isError, isFetching, isFetchingNextPage, isLoading, isRefetching],
  );
  const news = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data?.pages]);

  const navigation = useNavigation();
  const onItemPress = useCallback(
    (id: number) => {
      navigation.navigate(FEATURE_ARTICLES_ROUTES.details, {
        articleId: id,
      });
    },
    [navigation],
  );

  const handleFetchNextPage = useCallback(() => {
    if (!isPlaceholderData && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetchingNextPage, isPlaceholderData]);

  const renderItem = useCallback(
    (item: ListRenderItemInfo<Article>) => {
      if (item.item) {
        if (item.index === 0) {
          return <MainItem article={item.item} onPress={onItemPress} />;
        }
        return <Item onPress={onItemPress} article={item.item} />;
      }
      return (
        <Button
          disabled={isFetchingNextPage}
          loading={isFetchingNextPage}
          onPress={handleFetchNextPage}>
          Charger plus de brèves
        </Button>
      );
    },
    [handleFetchNextPage, isFetchingNextPage, onItemPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar backgroundColor={COLOR_BORDEAUX} />
      {shouldShowError ? <FetchError onRefetch={refetch} /> : null}
      {isLoading ? (
        <ListLoader />
      ) : (
        <VirtualizedList<Article>
          initialNumToRender={PER_PAGE}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString() || 'load-more-button'}
          data={news}
          getItem={getItem}
          getItemCount={getItemCount}
          onRefresh={refetch}
          refreshing={isRefetching}
          ListEmptyComponent={isLoading ? ListLoader : null}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
});
