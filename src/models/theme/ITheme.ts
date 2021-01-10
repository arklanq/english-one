import IThemePalette from '@/models/theme/IThemePalette';
import IThemeShadow from '@/models/theme/IThemeShadow';
import IThemeShape from '@/models/theme/IThemeShape';
import IThemeTypography from '@/models/theme/IThemeTypography';

export enum ThemeVariant {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ITheme {
  variant: ThemeVariant;
  palette: IThemePalette;
  typography: IThemeTypography;
  shadow: IThemeShadow;
  shape: IThemeShape;
}
