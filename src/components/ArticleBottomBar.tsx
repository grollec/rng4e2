import React, {useCallback} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {Article} from '../types/Article';
import {useNavigation} from '@react-navigation/native';
import {convert} from 'html-to-text';

export const BOTTOM_BAR_HEIGHT = 50;

type Props = {
  article?: Article;
};
export const ArticleBottomBar = ({article}: Props) => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();

  const handleShareArticle = useCallback(() => {
    if (article) {
      const title = convert(article.title);
      Share.share({
        message: `${convert(title)} - ${article.link}`,
        title: 'À lire sur Girondins 4 Ever',
        url: article.link,
      });
    }
  }, [article]);

  return (
    <View style={styles.bottomBar}>
      <View style={styles.container}>
        <IconButton
          icon="close"
          iconColor={theme.colors.onPrimaryContainer}
          onPress={() => navigation.goBack()}
        />
        {article ? (
          <IconButton
            icon="share-variant-outline"
            iconColor={theme.colors.onPrimaryContainer}
            onPress={handleShareArticle}
          />
        ) : null}
      </View>
    </View>
  );
};

function useStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: theme.colors.background,
      borderTopWidth: 0.5,
      borderTopColor: theme.colors.outlineVariant,
      height: BOTTOM_BAR_HEIGHT,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
}
