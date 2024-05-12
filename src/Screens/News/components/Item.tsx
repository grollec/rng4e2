import React, {memo} from 'react';
import {Article} from '../../../types/Article';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {convert} from 'html-to-text';

const fallback_pic = require('../../../assets/images/fallback_pic.jpg');

const ITEM_PADDING = 16;

type Props = {article: Article; onPress: (id: number) => void};
export const Item = memo(({article, onPress}: Props) => {
  const {id, title, img, date, categories} = article;
  const textTitle = convert(title);
  const styles = useStyles();
  return (
    <Pressable onPress={() => onPress(id)}>
      <View key={id} style={styles.item}>
        <View>
          <Text style={styles.all.date}>
            Publié le {date.format('ddd DD MMM YYYY - HH:mm')}
          </Text>
        </View>
        <View style={styles.all.middle}>
          <View style={styles.all.textPart}>
            <Text style={styles.title} numberOfLines={4}>
              {textTitle}
            </Text>
          </View>
          <View style={styles.all.imageContainer}>
            {img ? (
              <Image
                loadingIndicatorSource={fallback_pic}
                source={{uri: img}}
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
        <Text>{categories?.join(' - ')}</Text>
      </View>
    </Pressable>
  );
});

function useStyles() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    item: {
      padding: ITEM_PADDING,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outlineVariant,
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
    },
    itemTitle: {
      fontWeight: 'bold',
    },
    date: {
      fontWeight: 'thin',
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
