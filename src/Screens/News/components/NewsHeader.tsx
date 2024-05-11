import {Route} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {NEWS_ROUTES} from '../../../constants/routes';
import {useArticle} from '../../../hooks/useArticle';
import {convert} from 'html-to-text';

function useTitle(route: Route<string>) {
  const article = useArticle((route.params as {articleId?: number})?.articleId);
  switch (route.name) {
    case NEWS_ROUTES.list:
      return 'Brèves';
    case NEWS_ROUTES.details:
      return convert(article?.title || '');
    default:
      return '';
  }
}

export const NewsHeader = ({route, navigation}: NativeStackHeaderProps) => {
  const title = useTitle(route);
  const theme = useTheme();
  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.background,
        borderBottomColor: theme.colors.outline,
      }}>
      {route.name === NEWS_ROUTES.details ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title={title} color={theme.colors.onPrimaryContainer} />
    </Appbar.Header>
  );
};
