import {InfiniteData, keepPreviousData, useQuery} from '@tanstack/react-query';
import {Article} from '../types/Article';
import {
  ARTICLE_BY_ID_KEY,
  ArticleType,
  FEATURE_ARTICLES_QUERY_KEY,
  NEWS_QUERY_KEY,
  fetchArticle,
} from '../services/api';
import {useMemo} from 'react';

export function useArticle(articleType: ArticleType, id: number) {
  const {data} = useQuery<InfiniteData<Article[]>>({
    queryKey: [
      articleType === ArticleType.NEWS
        ? NEWS_QUERY_KEY
        : FEATURE_ARTICLES_QUERY_KEY,
    ],
    placeholderData: keepPreviousData,
  });

  const articleFromList = useMemo(
    () => (id ? data?.pages.flat().find(a => a.id === id) : undefined),
    [data?.pages, id],
  );

  const result = useArticleById({id, type: articleType});

  return {
    ...result,
    data: result.data || articleFromList,
  };
}

export function useArticleById({id, type}: {id: number; type: ArticleType}) {
  return useQuery({
    queryKey: [ARTICLE_BY_ID_KEY, id, type],
    queryFn: () => fetchArticle({id, type}),
    enabled: Boolean(id),
  });
}

export function useFeaturedArticle(id: number) {
  const {data} = useQuery<InfiniteData<Article[]>>({
    queryKey: [FEATURE_ARTICLES_QUERY_KEY],
    placeholderData: keepPreviousData,
  });

  const articleFromList = useMemo(
    () => (id ? data?.pages.flat().find(a => a.id === id) : undefined),
    [data?.pages, id],
  );
  const result = useArticleById({id, type: ArticleType.NEWS});

  return {
    ...result,
    data: result.data || articleFromList,
  };
}
