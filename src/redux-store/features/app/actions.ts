import * as Font from 'expo-font';

import fonts from './fonts';

export const loadFonts = async function (): Promise<void> {
  await Font.loadAsync(fonts);
};
