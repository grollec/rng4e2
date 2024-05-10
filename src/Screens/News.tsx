import {keepPreviousData, useInfiniteQuery} from '@tanstack/react-query';
import {isArray} from 'lodash';
import React, {useMemo, useState} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  useWindowDimensions,
} from 'react-native';
import {isRawArticle, parseRawArticle} from '../parsers/article';
import {Article} from '../types/Article';
import {COLOR_MARINE, COLOR_WHITE} from '../constants/colors';
import {convert} from 'html-to-text';

const PER_PAGE = 20;
const INITIAL_PAGE = 0;
const NEWS_QUERY_KEY = 'news';

function parseNewsResponse(data: unknown): Article[] {
  if (isArray(data)) {
    return data.filter(isRawArticle).map(parseRawArticle);
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

const Item = ({article, isOdd}: {article: Article; isOdd: boolean}) => {
  const {id, title, excerpt, img} = article;
  const {width} = useWindowDimensions();
  const textTitle = convert(title);
  const textExcerpt = convert(excerpt);
  const textStyles = getTextPartStyles(width);
  return (
    <View key={id} style={isOdd ? lightItem : darkItem}>
      <View>
        <Image source={{uri: img}} width={width * (1 / 3) - 16} height={120} />
      </View>
      <View style={textStyles}>
        <Text style={isOdd ? lightTitle : darkTitle} numberOfLines={2}>
          {textTitle}
        </Text>
        <Text style={isOdd ? lightText : darkText} numberOfLines={4}>
          {textExcerpt}
        </Text>
      </View>
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

  const news = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data?.pages]);

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList<Article>
        initialNumToRender={PER_PAGE}
        renderItem={item => (
          <Item article={item.item} isOdd={item.index % 2 === 0} />
        )}
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
  item: {
    flexDirection: 'row',
    height: 136,
    padding: 8,
  },
  darkBackground: {
    backgroundColor: COLOR_MARINE,
  },
  darkTextColor: {
    color: COLOR_WHITE,
  },
  lightBackground: {
    backgroundColor: COLOR_WHITE,
  },
  lightTextColor: {
    color: COLOR_MARINE,
  },
  itemText: {
    fontWeight: 'regular',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});

const lightItem = StyleSheet.compose(styles.item, styles.lightBackground);
const lightText = StyleSheet.compose(styles.itemText, styles.lightTextColor);
const lightTitle = StyleSheet.compose(styles.itemTitle, styles.lightTextColor);

const darkItem = StyleSheet.compose(styles.item, styles.darkBackground);
const darkText = StyleSheet.compose(styles.itemText, styles.darkTextColor);
const darkTitle = StyleSheet.compose(styles.itemTitle, styles.darkTextColor);

function getTextPartStyles(width: number) {
  return StyleSheet.compose(
    {
      paddingLeft: 8,
      justifyContent: 'space-between',
    },
    {width: width * (2 / 3)},
  );
}
