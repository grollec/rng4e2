export const MAIN_ROUTES = {
  home: 'home' as const,
  news: 'news' as const,
  featureArticles: 'featured-articles' as const,
  settings: 'settings' as const,
};

export const NEWS_ROUTES = {
  main: `${MAIN_ROUTES.news}-main` as const,
  list: `${MAIN_ROUTES.news}-list` as const,
  details: `${MAIN_ROUTES.news}-details` as const,
};

export const FEATURE_ARTICLES_ROUTES = {
  main: `${MAIN_ROUTES.featureArticles}-main` as const,
  list: `${MAIN_ROUTES.featureArticles}-list` as const,
  details: `${MAIN_ROUTES.featureArticles}-details` as const,
};

export type NewsRoutesParamList = {
  [NEWS_ROUTES.details]: {
    articleId: number;
  };
  [NEWS_ROUTES.list]: undefined;
};

export type FeatureArticlesParamList = {
  [FEATURE_ARTICLES_ROUTES.list]: undefined;
  [FEATURE_ARTICLES_ROUTES.details]: {
    articleId: number;
  };
};

export const SETTINGS_ROUTES = {
  list: `${MAIN_ROUTES.settings}-list` as const,
};

export type SettingsRoutesParamList = {
  [SETTINGS_ROUTES.list]: undefined;
};

export type AppRoutesParamsList = {
  [MAIN_ROUTES.home]: undefined;
  [MAIN_ROUTES.news]: undefined;
  [MAIN_ROUTES.settings]: undefined;
  [SETTINGS_ROUTES.list]: undefined;
} & SettingsRoutesParamList &
  FeatureArticlesParamList &
  NewsRoutesParamList;
