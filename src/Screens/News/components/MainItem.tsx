import React from 'react';
import {Article} from '../../../types/Article';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  COLOR_MARINE,
  COLOR_WHITE,
  LIGHT_THEME,
} from '../../../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {convert} from 'html-to-text';

const fallback_pic = require('../../../assets/images/fallback_pic.jpg');

type Props = {
  article: Article;
  onPress: (id: number) => void;
};
export const MainItem = ({article, onPress}: Props) => {
  const {id, img, title, date, author} = article;
  const styles = useStyles();
  const textTitle = convert(title);
  return (
    <Pressable onPress={() => onPress(id)}>
      <ImageBackground
        source={{uri: img}}
        defaultSource={fallback_pic}
        style={styles.imageBackground}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,1)']}
          style={styles.gradient}>
          <View style={styles.container}>
            <Text style={styles.title}>{textTitle}</Text>
            <Text style={styles.author}>
              Par {author} le {date.format('ddd DD MMM YYYY - HH:mm')}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

function useStyles() {
  return StyleSheet.create({
    imageBackground: {
      height: 300,
      backgroundColor: COLOR_MARINE,
    },
    container: {
      padding: 16,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    title: {
      color: COLOR_WHITE,
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 8,
    },
    author: {
      color: LIGHT_THEME.colors.onPrimary,
    },
    gradient: {
      flex: 1,
    },
  });
}
