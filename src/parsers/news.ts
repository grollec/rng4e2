import {has, isObject} from 'lodash';
import {Article, RawArticle} from '../types/Article';

function hasValidId(maybeNews: object) {
  return has(maybeNews, 'id') && typeof maybeNews.id === 'number';
}
function isHTMLData(maybeHTMLData: unknown) {
  return (
    isObject(maybeHTMLData) &&
    has(maybeHTMLData, 'rendered') &&
    typeof maybeHTMLData.rendered === 'string'
  );
}
function hasValidContent(maybeNews: object) {
  return has(maybeNews, 'content') && isHTMLData(maybeNews.content);
}
function hasValidExcerpt(maybeNews: object) {
  return has(maybeNews, 'excerpt') && isHTMLData(maybeNews.excerpt);
}
function hasValidTitle(maybeNews: object) {
  return has(maybeNews, 'title') && isHTMLData(maybeNews.title);
}

export function isRawNews(maybeNews: unknown): maybeNews is RawArticle {
  if (isObject(maybeNews)) {
    if (
      hasValidId(maybeNews) &&
      hasValidContent(maybeNews) &&
      hasValidExcerpt(maybeNews) &&
      hasValidTitle(maybeNews)
    ) {
      return true;
    }
  }
  return false;
}

export function parseRawNews(rawNews: RawArticle): Article {
  const {id, content, excerpt, title} = rawNews;
  return {
    id,
    content: content.rendered,
    excerpt: excerpt.rendered,
    title: title.rendered,
  };
}
