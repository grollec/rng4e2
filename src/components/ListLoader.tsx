import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

export const ListLoader = () => {
  const theme = useTheme();
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.onPrimaryContainer} />
    </View>
  );
};

function useStyles() {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
}
