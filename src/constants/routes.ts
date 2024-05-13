export const MAIN_ROUTES = {
  news: 'news' as const,
  articles: 'articles' as const,
  settings: 'settings' as const,
};

export const NEWS_ROUTES = {
  list: `${MAIN_ROUTES.news}-list` as const,
  details: `${MAIN_ROUTES.news}-details` as const,
};

export type AppRoutesParamsList = {
  [MAIN_ROUTES.news]: undefined;
  [NEWS_ROUTES.list]: undefined;
  [NEWS_ROUTES.details]: {
    articleId: number;
  };
  [MAIN_ROUTES.settings]: undefined;
  [SETTINGS_ROUTES.list]: undefined;
} & SettingsRoutesParamList;

export const SETTINGS_ROUTES = {
  list: `${MAIN_ROUTES.settings}-list` as const,
};

export type SettingsRoutesParamList = {
  [SETTINGS_ROUTES.list]: undefined;
};
