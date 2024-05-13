import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SETTINGS_ROUTES, SettingsRoutesParamList} from '../constants/routes';
import {SettingsScreen} from '../Screens/Settings';
import {useTheme} from 'react-native-paper';

const Stack = createNativeStackNavigator<SettingsRoutesParamList>();

export const SettingsNavigator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SETTINGS_ROUTES.list}
        component={SettingsScreen}
        options={{
          title: 'Paramètres',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.onPrimaryContainer,
          },
        }}
      />
    </Stack.Navigator>
  );
};
