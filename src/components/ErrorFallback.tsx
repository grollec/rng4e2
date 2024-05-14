import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MAIN_ROUTES} from '../constants/routes';

export const ErrorFallback = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Une erreur est survenue. L’équipe technique à été prévenue.</Text>
        <Button
          title="Réessayer"
          onPress={() => navigation.navigate(MAIN_ROUTES.home)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
