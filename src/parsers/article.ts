import {has, isObject} from 'lodash';
import dayjs from 'dayjs';
import {Article, RawArticle} from '../types/Article';

function hasValidId(maybeArticle: object) {
  return has(maybeArticle, 'id') && typeof maybeArticle.id === 'number';
}
function isHTMLData(maybeHTMLData: unknown) {
  return (
    isObject(maybeHTMLData) &&
    has(maybeHTMLData, 'rendered') &&
    typeof maybeHTMLData.rendered === 'string'
  );
}
function hasValidContent(maybeArticle: object) {
  return has(maybeArticle, 'content') && isHTMLData(maybeArticle.content);
}
function hasValidExcerpt(maybeArticle: object) {
  return has(maybeArticle, 'excerpt') && isHTMLData(maybeArticle.excerpt);
}
function hasValidTitle(maybeArticle: object) {
  return has(maybeArticle, 'title') && isHTMLData(maybeArticle.title);
}
function hasValidDate(maybeArticle: object) {
  return has(maybeArticle, 'date') && dayjs(maybeArticle.date).isValid();
}

export function isRawArticle(
  maybeArticle: unknown,
): maybeArticle is RawArticle {
  if (isObject(maybeArticle)) {
    if (
      hasValidId(maybeArticle) &&
      hasValidContent(maybeArticle) &&
      hasValidExcerpt(maybeArticle) &&
      hasValidTitle(maybeArticle) &&
      hasValidDate(maybeArticle)
    ) {
      return true;
    }
  }
  return false;
}

export function parseRawArticle(rawNews: RawArticle): Article {
  const {id, content, excerpt, title, link, date, _embedded, type} = rawNews;
  return {
    id,
    link,
    date: dayjs(date),
    type,
    content: content?.rendered,
    excerpt: excerpt?.rendered,
    title: title?.rendered,
    img: _embedded?.['wp:featuredmedia']?.find(fm => fm.source_url)?.source_url,
    author: _embedded?.author?.find(a => a.name)?.name || 'G4E',
    categories: _embedded?.['wp:term']
      ?.map(t => t.map(tt => tt.name))
      .flat()
      .filter((cat): cat is string => cat !== undefined),
  };
}
