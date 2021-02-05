import {fontName} from '@/redux-store/features/app/fonts';
import {IThemePrototype} from '@/theme/createTheme';

const theme: IThemePrototype = {
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
