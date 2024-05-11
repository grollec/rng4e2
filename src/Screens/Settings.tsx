import React, {useCallback} from 'react';
import {
  Appearance,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Switch, List} from 'react-native-paper';

export const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <List.Section>
          <List.Item title="Dark mode" left={ThemeIcon} right={ThemeSwitch} />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const ThemeIcon = () => <List.Icon icon="theme-light-dark" />;
const ThemeSwitch = () => {
  const theme = useColorScheme();
  const handleToggleTheme = useCallback(() => {
    Appearance.setColorScheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);
  return <Switch value={theme === 'dark'} onValueChange={handleToggleTheme} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 8,
  },
});
