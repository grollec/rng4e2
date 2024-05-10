import {isArray} from 'lodash';
import {Article} from '../types/Article';
import {isRawArticle, parseRawArticle} from '../parsers/article';

const PER_PAGE = 20;
export const NEWS_QUERY_KEY = 'news';

function parseNewsResponse(data: unknown): Article[] {
  if (isArray(data)) {
    return data.filter(isRawArticle).map(parseRawArticle);
  }
  return [];
}

export async function fetchNews({pageParam}: {pageParam: number}) {
  const res = await fetch(
    `https://www.girondins4ever.com/wp-json/wp/v2/breves?per_page=${PER_PAGE}&offset=${
      pageParam * PER_PAGE
    }`,
    {},
  );
  const rawNews = await res.json();
  return parseNewsResponse(rawNews);
}
