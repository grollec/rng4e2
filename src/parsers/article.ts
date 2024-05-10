import {has, isObject} from 'lodash';
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

export function isRawArticle(
  maybeArticle: unknown,
): maybeArticle is RawArticle {
  if (isObject(maybeArticle)) {
    if (
      hasValidId(maybeArticle) &&
      hasValidContent(maybeArticle) &&
      hasValidExcerpt(maybeArticle) &&
      hasValidTitle(maybeArticle)
    ) {
      return true;
    }
  }
  return false;
}

export function parseRawArticle(rawNews: RawArticle): Article {
  const {id, content, excerpt, title, fimg_url} = rawNews;
  return {
    id,
    content: content.rendered,
    excerpt: excerpt.rendered,
    title: title.rendered,
    img: fimg_url,
  };
}
