import React from 'react';
import {Article} from '../../../types/Article';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {convert} from 'html-to-text';

type Props = {article: Article; onPress: (id: number) => void};
export const Item = ({article, onPress}: Props) => {
  const {id, title, excerpt, img} = article;
  const {width} = useWindowDimensions();
  const textTitle = convert(title);
  const textExcerpt = convert(excerpt);
  const textStyles = getTextPartStyles(width);
  const styles = useStyles();
  return (
    <Pressable onPress={() => onPress(id)}>
      <View key={id} style={styles.item}>
        <View>
          <Image
            source={{uri: img}}
            width={width * (1 / 3) - 16}
            height={120}
          />
        </View>
        <View style={textStyles}>
          <Text style={styles.title} numberOfLines={2}>
            {textTitle}
          </Text>
          <Text style={styles.text} numberOfLines={4}>
            {textExcerpt}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

function useStyles() {
  const theme = useTheme();
  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      height: 136,
      padding: 8,
    },
    background: {
      backgroundColor: theme.colors.background,
    },
    textColor: {
      color: theme.colors.onPrimaryContainer,
    },
    itemText: {
      fontWeight: 'regular',
    },
    itemTitle: {
      fontWeight: 'bold',
    },
  });

  const item = StyleSheet.compose(styles.item, styles.background);
  const text = StyleSheet.compose(styles.itemText, styles.textColor);
  const title = StyleSheet.compose(styles.itemTitle, styles.textColor);

  return {
    item,
    text,
    title,
  };
}

function getTextPartStyles(width: number) {
  return StyleSheet.compose(
    {
      paddingLeft: 8,
      justifyContent: 'space-between',
    },
    {width: width * (2 / 3)},
  );
}
