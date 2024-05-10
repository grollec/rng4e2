import {NewsRoutesParamsList} from '../constants/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootParamList, NewsRoutesParamsList {}
  }
}
