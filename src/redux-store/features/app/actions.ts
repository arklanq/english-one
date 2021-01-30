import * as Font from 'expo-font';

import {ThunkFn} from '@/redux-store/types';

import fonts from './fonts';

export const loadFontsAction: ThunkFn = () => async () => {
  await Font.loadAsync(fonts);
};
