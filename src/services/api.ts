import {isArray} from 'lodash';
import {Article} from '../types/Article';
import {isRawArticle, parseRawArticle} from '../parsers/article';
import crashlytics from '@react-native-firebase/crashlytics';

export enum ArticleType {
  NEWS = 'breves',
  FEATURE_ARTICLE = 'posts',
}

const BASE_URL = 'https://girondins4ever.com/wp-json/wp/v2';

const PER_PAGE = 20;
export const NEWS_QUERY_KEY = 'news';
const ARTICLE_FIELDS = 'id,date,link,title,content,excerpt,type,_links';

function parseNewsResponse(data: unknown): Article[] {
  if (isArray(data)) {
    return data.filter(isRawArticle).map(parseRawArticle);
  }
  return [];
}

export async function fetchNews({pageParam}: {pageParam: number}) {
  const url = `${BASE_URL}/${ArticleType.NEWS}?per_page=${PER_PAGE}&offset=${
    pageParam * PER_PAGE
  }&_fields=${ARTICLE_FIELDS}&_embed`;
  try {
    const res = await fetch(url, {});
    const rawNews = await res.json();
    return parseNewsResponse(rawNews);
  } catch (error) {
    crashlytics().recordError(error as Error);
    throw error;
  }
}

export const ARTICLE_BY_ID_KEY = 'article-by-id';
export async function fetchArticle({
  type,
  id,
}: {
  type: ArticleType;
  id?: number;
}): Promise<Article | undefined> {
  if (!id) {
    return;
  }
  try {
    const url = `${BASE_URL}/${type}?include=${id}&_fields=${ARTICLE_FIELDS}&_embed`;
    const res = await fetch(url, {});
    const rawNews = await res.json();
    return parseNewsResponse(rawNews)[0];
  } catch (error) {
    crashlytics().recordError(error as Error);
    throw error;
  }
}

export const FEATURE_ARTICLES_QUERY_KEY = 'feature-articles';
export async function fetchFeatureArticles({pageParam}: {pageParam: number}) {
  try {
    const url = `${BASE_URL}/${
      ArticleType.FEATURE_ARTICLE
    }?per_page=${PER_PAGE}&offset=${
      pageParam * PER_PAGE
    }&_fields=${ARTICLE_FIELDS}&_embed`;
    const res = await fetch(url, {});
    const rawArticles = await res.json();
    return parseNewsResponse(rawArticles);
  } catch (error) {
    crashlytics().recordError(error as Error);
    throw error;
  }
}
