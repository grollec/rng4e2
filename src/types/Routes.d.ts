import {AppRoutesParamsList} from '../constants/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList, AppRoutesParamsList {}
  }
}
