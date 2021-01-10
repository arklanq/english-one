import {Platform} from 'react-native';

import {ITheme, ThemeVariant} from '@/models/theme/ITheme';

const isPlatformIOS = Platform.OS === 'ios';

const materialUiTheme: ITheme = {
  variant: ThemeVariant.DARK,
  palette: {
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    primary: {
      light: '#7986cb',
      main: '#3F51B5',
      dark: '#303F9F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FF4081',
      main: '#F50057',
      dark: '#C51162',
      contrastText: '#FFFFFF',
    },
    error: {
      light: '#E57373',
      main: '#F44336',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#FFB74D',
      main: '#FF9800',
      dark: '#F57C00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: '#64B5F6',
      main: '#2196F3',
      dark: '#1976D2',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#81C784',
      main: '#4CAF50',
      dark: '#388E3C',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      paper: '#424242',
      default: '#303030',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#616161',
      A700: '#303030',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: '#FFFFFF',
    },
    contrastText: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      icon: 'rgba(0, 0, 0, 0.87)',
    },
    misc: {
      divider: 'rgba(255, 255, 255, 0.12)',
      barColor: '#303F9F',
      headerColor: '#3F51B5',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },
  },
  typography: {
    h1: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif-light',
      fontWeight: isPlatformIOS ? '300' : 'normal',
      fontSize: 40,
      lineHeight: 48,
      marginBottom: 20,
      color: 'primary',
    },
    h2: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif-light',
      fontWeight: isPlatformIOS ? '300' : 'normal',
      fontSize: 34,
      lineHeight: 40,
      marginBottom: 18,
      color: 'primary',
    },
    h3: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 28,
      lineHeight: 40,
      marginBottom: 15,
      color: 'primary',
    },
    h4: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 24,
      lineHeight: 32,
      marginBottom: 12,
      color: 'primary',
    },
    h5: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 22,
      lineHeight: 32,
      marginBottom: 10,
      color: 'primary',
    },
    h6: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif-medium',
      fontWeight: isPlatformIOS ? '500' : 'normal',
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 8,
      color: 'primary',
    },
    subtitle1: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 8,
      color: 'primary',
    },
    subtitle2: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif-medium',
      fontWeight: isPlatformIOS ? '500' : 'normal',
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 8,
      color: 'secondary',
    },
    body1: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 8,
      color: 'primary',
    },
    body2: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 16,
      lineHeight: 20,
      marginBottom: 8,
      color: 'secondary',
    },
    button: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif-medium',
      fontWeight: isPlatformIOS ? '500' : 'normal',
      fontSize: 18,
      lineHeight: 24,
      marginBottom: 8,
      color: 'primary',
    },
    caption: {
      fontFamily: isPlatformIOS ? 'System' : 'sans-serif',
      fontWeight: isPlatformIOS ? '400' : 'normal',
      fontSize: 15,
      lineHeight: 18,
      marginBottom: 6,
      color: 'hint',
    },
  },
  shadow: {
    1: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
    2: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    3: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    4: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    5: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    6: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    7: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    8: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    9: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    10: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    11: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,

      elevation: 11,
    },
    12: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
    13: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.39,
      shadowRadius: 8.3,

      elevation: 13,
    },
    14: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
    },
    15: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,

      elevation: 15,
    },
    16: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,

      elevation: 16,
    },
    17: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,

      elevation: 17,
    },
    18: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 18,
    },
    19: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12.35,

      elevation: 19,
    },
    20: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.51,
      shadowRadius: 13.16,

      elevation: 20,
    },
    21: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.53,
      shadowRadius: 13.97,

      elevation: 21,
    },
    22: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 11,
      },
      shadowOpacity: 0.55,
      shadowRadius: 14.78,

      elevation: 22,
    },
    23: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 11,
      },
      shadowOpacity: 0.57,
      shadowRadius: 15.19,

      elevation: 23,
    },
    24: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
  },
  shape: {
    borderRadius: 4,
  },
};

export default materialUiTheme;
