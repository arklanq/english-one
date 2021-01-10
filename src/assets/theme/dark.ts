import defaultsDeep from 'lodash/defaultsDeep';

import {ThemeVariant} from '@/models/theme/ITheme';

import {IThemePrototype} from '../../theme/createTheme';
import baseTheme from './base';

const theme: IThemePrototype = defaultsDeep(
  {
    variant: ThemeVariant.DARK,
  } as IThemePrototype,
  baseTheme
);

export default theme;
