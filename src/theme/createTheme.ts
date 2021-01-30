import cloneDeep from 'lodash/cloneDeep';
import defaultsDeep from 'lodash/defaultsDeep';
import {DeepPartial} from 'redux';

import {ITheme, ThemeVariant} from '@/models/theme/ITheme';
import IThemeTypography, {IFontTypography} from '@/models/theme/IThemeTypography';

import defaultDarkTheme from './defaults/default-dark';
import defaultLightTheme from './defaults/default-light';
import {isPredefinedFontColor} from './utilities/predefined-font-colors';

export type IThemePrototype = DeepPartial<ITheme>;

export default function createTheme(theme: IThemePrototype): ITheme {
  const themeVariant = theme.variant ?? ThemeVariant.LIGHT;
  const defaultTheme = themeVariant === ThemeVariant.LIGHT ? defaultLightTheme : defaultDarkTheme;
  const completeTheme: ITheme = defaultsDeep(cloneDeep(theme), defaultTheme);

  let typographyName: keyof IThemeTypography;
  for (typographyName in completeTheme.typography) {
    const typographyValue: IFontTypography = completeTheme.typography[typographyName];
    if (isPredefinedFontColor(typographyValue.color)) {
      completeTheme.typography[typographyName] = {
        ...typographyValue,
        ...{color: completeTheme.palette.text[typographyValue.color]},
      };
    }
  }

  return completeTheme;
}
