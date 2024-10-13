import {Route} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {MAIN_ROUTES, NEWS_ROUTES} from '../../../constants/routes';
import {COLOR_MARINE, COLOR_WHITE} from '../../../constants/colors';

function useTitle(route: Route<string>) {
  switch (route.name) {
    case NEWS_ROUTES.list:
      return 'Brèves';
    default:
      return '';
  }
}

export const NewsHeader = ({route, navigation}: NativeStackHeaderProps) => {
  const title = useTitle(route);
  return (
    <Appbar.Header style={{backgroundColor: 'rgba(0,0,0,0)'}}>
      {route.name === MAIN_ROUTES.details ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={COLOR_WHITE}
          style={{
            backgroundColor: COLOR_MARINE,
          }}
        />
      ) : null}
      <Appbar.Content title={title} color={COLOR_WHITE} />
    </Appbar.Header>
  );
};
