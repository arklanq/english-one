export interface IThemeColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export default interface IThemePalette {
  common: {
    black: string;
    white: string;
  };
  primary: IThemeColor;
  secondary: IThemeColor;
  error: IThemeColor;
  warning: IThemeColor;
  info: IThemeColor;
  success: IThemeColor;
  background: {
    paper: string;
    default: string;
  };
  grey: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'A100' | 'A200' | 'A400' | 'A700', string>;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
    icon: string;
  };
  contrastText: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
    icon: string;
  };
  misc: {
    divider: string;
    barColor: string;
    headerColor: string;
  };
  action: {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
  };
}
