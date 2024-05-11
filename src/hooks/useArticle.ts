import {InfiniteData, keepPreviousData, useQuery} from '@tanstack/react-query';
import {Article} from '../types/Article';
import {NEWS_QUERY_KEY} from '../services/api';
import {useMemo} from 'react';

export function useArticle(id?: number) {
  const {data} = useQuery<InfiniteData<Article[]>>({
    queryKey: [NEWS_QUERY_KEY],
    placeholderData: keepPreviousData,
  });

  const article = useMemo(
    () => (id ? data?.pages.flat().find(a => a.id === id) : undefined),
    [data?.pages, id],
  );
  return article;
}
