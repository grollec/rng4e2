import React, {memo} from 'react';
import {Article} from '../../../types/Article';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme, Text, Divider} from 'react-native-paper';
import {convert} from 'html-to-text';

const fallback_pic = require('../../../assets/images/fallback_pic.jpg');

const ITEM_PADDING = 16;

type Props = {article: Article; onPress: (id: number) => void};
export const Item = memo(({article, onPress}: Props) => {
  const {id, title, thumbnail, date, categories} = article;
  const textTitle = convert(title);
  const styles = useStyles();
  return (
    <Pressable onPress={() => onPress(id)}>
      <View key={id} style={styles.item}>
        <View>
          <Text style={styles.all.date} variant="labelSmall">
            Publié le {date.format('ddd DD MMM YYYY - HH:mm')}
          </Text>
        </View>
        <View style={styles.all.middle}>
          <View style={styles.all.textPart}>
            <Text style={styles.title} variant="titleMedium" numberOfLines={4}>
              {textTitle}
            </Text>
          </View>
          <View style={styles.all.imageContainer}>
            {thumbnail ? (
              <Image
                loadingIndicatorSource={fallback_pic}
                source={{uri: thumbnail}}
                style={styles.all.image}
              />
            ) : (
              <Image
                source={fallback_pic}
                resizeMode="contain"
                style={styles.all.image}
              />
            )}
          </View>
        </View>
        <Text style={styles.all.categories} variant="labelSmall">
          {categories?.join(' - ')}
        </Text>
        <Divider style={styles.all.divider} />
      </View>
    </Pressable>
  );
});

function useStyles() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    item: {
      padding: ITEM_PADDING,
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: 'red',
    },
    middle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    background: {
      backgroundColor: theme.colors.background,
    },
    textPart: {
      width: '60%',
    },
    textColor: {
      color: theme.colors.onTertiaryContainer,
    },
    titleColor: {
      color: theme.colors.onPrimaryContainer,
    },
    itemText: {
      fontWeight: 'regular',
      color: theme.colors.onTertiaryContainer,
    },
    itemTitle: {
      fontWeight: 'bold',
    },
    date: {
      fontWeight: 'thin',
      color: theme.colors.onPrimaryContainer,
      marginBottom: 8,
    },
    categories: {
      color: theme.colors.onPrimaryContainer,
      marginTop: 8,
    },
    imageContainer: {
      width: '40%',
      height: 100,
      flex: 1,
      alignItems: 'flex-end',
    },
    image: {
      maxWidth: '90%',
      height: 100,
      aspectRatio: 16 / 9,
    },
    divider: {
      marginTop: 16,
    },
  });

  const item = StyleSheet.compose(styles.item, styles.background);
  const text = StyleSheet.compose(styles.itemText, styles.textColor);
  const title = StyleSheet.compose(styles.itemTitle, styles.titleColor);

  return {
    item,
    text,
    title,
    all: styles,
  };
}
