import defaultsDeep from 'lodash/defaultsDeep';

import {ThemeVariant} from '@/models/theme/ITheme';
import {IThemePrototype} from '@/theme/createTheme';

import baseTheme from './base';

const theme: IThemePrototype = defaultsDeep(
  {
    variant: ThemeVariant.LIGHT,
    palette: {
      primary: {
        light: '#FFE0B2',
        main: '#FF9800',
        dark: '#F57C00',
        contrastText: '#FFFFFF',
      },
      secondary: {
        light: '#FFCCBC',
        main: '#FF5722',
        dark: '#E64A19',
        contrastText: '#FFFFFF',
      },
      misc: {
        //divider: '#BDBDBD',
        barColor: '#F57C00',
        tint: '#F57C00',
        headerColor: '#FF9800',
      },
    },
  } as IThemePrototype,
  baseTheme
);

export default theme;
