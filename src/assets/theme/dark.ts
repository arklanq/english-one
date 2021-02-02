import Color from 'color';
import defaultsDeep from 'lodash/defaultsDeep';

import {ThemeVariant} from '@/models/theme/ITheme';
import {IThemePrototype} from '@/theme/createTheme';

import baseTheme from './base';

const theme: IThemePrototype = defaultsDeep(
  {
    variant: ThemeVariant.DARK,
    palette: {
      primary: {
        light: Color('#FFE0B2').darken(0.15).toString(),
        main: Color('#FF9800').darken(0.15).toString(),
        dark: Color('#F57C00').darken(0.15).toString(),
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: Color('#FFCCBC').darken(0.15).toString(),
        main: Color('#FF5722').darken(0.15).toString(),
        dark: Color('#E64A19').darken(0.15).toString(),
        contrastText: '#FFFFFF',
      },
      misc: {
        barColor: Color('#F57C00').darken(0.15).toString(),
        tint: Color('#F57C00').darken(0.15).toString(),
        headerColor: Color('#FF9800').darken(0.15).toString(),
      },
    },
  } as IThemePrototype,
  baseTheme
);

export default theme;
