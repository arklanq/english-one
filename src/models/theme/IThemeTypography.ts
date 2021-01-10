export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type PredefinedFontColor = 'primary' | 'secondary' | 'disabled' | 'hint' | 'icon';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption';

export interface IFontTypography {
  fontFamily?: string; // 'undefined' value can be passed to use system default font
  fontWeight: FontWeight;
  fontSize: number;
  lineHeight: number;
  marginBottom: number;
  color: string | PredefinedFontColor;
}

type IThemeTypography = Record<TypographyVariant, IFontTypography>;

export default IThemeTypography;
