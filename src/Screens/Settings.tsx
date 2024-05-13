import React, {useCallback} from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {List, SegmentedButtons, Text} from 'react-native-paper';
import {Settings} from '../types/Settings';
import {useSettingsMutation, useSettingsQuery} from '../hooks/useSettings';

const TOSURL = 'https://www.girondins4ever.com/mentions-legales/';

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text variant="titleMedium">Paramètres</Text>
          <View>
            <Text style={styles.label} variant="labelMedium">
              Thème
            </Text>
            <ThemeSwitch />
          </View>
          <View style={styles.section}>
            <Text variant="titleMedium">Liens utiles</Text>
            <List.Section>
              <List.Item
                title="Mentions légales"
                right={TOSIcon}
                onPress={() => Linking.openURL(TOSURL)}
              />
            </List.Section>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const TOSIcon = () => <List.Icon icon="arrow-top-right-bold-box-outline" />;

const ThemeSwitch = () => {
  const {data} = useSettingsQuery();
  const {mutate} = useSettingsMutation();
  const handleChangeTheme = useCallback(
    (nextTheme?: Settings['activeTheme']) => {
      console.log(nextTheme);
      if (nextTheme) {
        mutate({activeTheme: nextTheme});
      }
    },
    [mutate],
  );
  return (
    <SegmentedButtons
      multiSelect={false}
      value={data?.activeTheme || 'system'}
      onValueChange={nextValue =>
        handleChangeTheme(nextValue as Settings['activeTheme'])
      }
      buttons={[
        {
          label: 'Light',
          value: 'light',
          icon: 'white-balance-sunny',
        },
        {
          label: 'Dark',
          value: 'dark',
          icon: 'moon-waning-crescent',
        },
        {
          label: 'System',
          value: 'system',
          icon: 'theme-light-dark',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginTop: 16,
  },
  label: {
    margin: 8,
  },
});
