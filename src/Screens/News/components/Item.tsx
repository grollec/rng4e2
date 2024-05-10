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
import {convert} from 'html-to-text';
import {COLOR_MARINE, COLOR_WHITE} from '../../../constants/colors';

type Props = {article: Article; isOdd: boolean; onPress: (id: number) => void};
export const Item = ({article, isOdd, onPress}: Props) => {
  const {id, title, excerpt, img} = article;
  const {width} = useWindowDimensions();
  const textTitle = convert(title);
  const textExcerpt = convert(excerpt);
  const textStyles = getTextPartStyles(width);
  return (
    <Pressable onPress={() => onPress(id)}>
      <View key={id} style={isOdd ? lightItem : darkItem}>
        <View>
          <Image
            source={{uri: img}}
            width={width * (1 / 3) - 16}
            height={120}
          />
        </View>
        <View style={textStyles}>
          <Text style={isOdd ? lightTitle : darkTitle} numberOfLines={2}>
            {textTitle}
          </Text>
          <Text style={isOdd ? lightText : darkText} numberOfLines={4}>
            {textExcerpt}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 136,
    padding: 8,
  },
  darkBackground: {
    backgroundColor: COLOR_MARINE,
  },
  darkTextColor: {
    color: COLOR_WHITE,
  },
  lightBackground: {
    backgroundColor: COLOR_WHITE,
  },
  lightTextColor: {
    color: COLOR_MARINE,
  },
  itemText: {
    fontWeight: 'regular',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
});

const lightItem = StyleSheet.compose(styles.item, styles.lightBackground);
const lightText = StyleSheet.compose(styles.itemText, styles.lightTextColor);
const lightTitle = StyleSheet.compose(styles.itemTitle, styles.lightTextColor);

const darkItem = StyleSheet.compose(styles.item, styles.darkBackground);
const darkText = StyleSheet.compose(styles.itemText, styles.darkTextColor);
const darkTitle = StyleSheet.compose(styles.itemTitle, styles.darkTextColor);

function getTextPartStyles(width: number) {
  return StyleSheet.compose(
    {
      paddingLeft: 8,
      justifyContent: 'space-between',
    },
    {width: width * (2 / 3)},
  );
}
