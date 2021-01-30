import {fontName} from '@/redux-store/features/app/fonts';
import {IThemePrototype} from '@/theme/createTheme';

const theme: IThemePrototype = {
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
  typography: {
    h1: {
      fontFamily: fontName['Poppins-Light'],
    },
    h2: {
      fontFamily: fontName['Poppins-Light'],
    },
    h3: {
      fontFamily: fontName['Poppins-Regular'],
    },
    h4: {
      fontFamily: fontName['Poppins-Regular'],
    },
    h5: {
      fontFamily: fontName['Poppins-Regular'],
    },
    h6: {
      fontFamily: fontName['Poppins-Medium'],
    },
    subtitle1: {
      fontFamily: fontName['Poppins-Regular'],
    },
    subtitle2: {
      fontFamily: fontName['Poppins-Medium'],
    },
    body1: {
      fontFamily: fontName['Poppins-Regular'],
    },
    body2: {
      fontFamily: fontName['Poppins-Regular'],
    },
    button: {
      fontFamily: fontName['Poppins-Medium'],
    },
    caption: {
      fontFamily: fontName['Poppins-Regular'],
    },
  },
};

export default theme;
