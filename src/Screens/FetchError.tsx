import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

type Props = {
  onRefetch: () => {};
};
export const FetchError = ({onRefetch}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} variant="labelMedium">
        Une erreur est survenue pendant le chargement des données.
      </Text>
      <Button onPress={onRefetch}>Réessayer</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  text: {
    textAlign: 'center',
  },
});
