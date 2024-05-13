export const MAIN_ROUTES = {
  news: 'news' as const,
  articles: 'articles' as const,
  settings: 'settings' as const,
};

export const NEWS_ROUTES = {
  list: `${MAIN_ROUTES.news}-list` as const,
  details: `${MAIN_ROUTES.news}-details` as const,
};

export type RoutesParamsList = {
  [MAIN_ROUTES.news]: undefined;
  [NEWS_ROUTES.list]: undefined;
  [NEWS_ROUTES.details]: {
    articleId: number;
  };
  [MAIN_ROUTES.settings]: undefined;
};
