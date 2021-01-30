import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';

import {ITheme, ThemeVariant} from '@/models/theme/ITheme';
import {fontName} from '@/redux-store/features/app/fonts';

export default function convertToPaperTheme(theme: ITheme): PaperTheme {
  const {variant, palette, shape} = theme;

  return {
    ...PaperDefaultTheme,
    dark: variant === ThemeVariant.DARK,
    mode: 'adaptive',
    roundness: shape.borderRadius,
    colors: {
      primary: palette.primary.main,
      accent: palette.secondary.main,
      background: palette.background.default,
      surface: palette.background.paper,
      error: palette.error.main,
      text: palette.text.primary,
      onBackground: palette.text.primary,
      onSurface: palette.text.primary,
      disabled: palette.action.disabled,
      placeholder: palette.action.active,
      backdrop: palette.action.focus,
      notification: palette.secondary.main,
    },
    fonts: {
      thin: {
        fontFamily: fontName['Poppins-Thin'],
        fontWeight: 'normal',
      },
      light: {
        fontFamily: fontName['Poppins-Light'],
        fontWeight: 'normal',
      },
      regular: {
        fontFamily: fontName['Poppins-Regular'],
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: fontName['Poppins-Medium'],
        fontWeight: 'normal',
      },
    },
  };
}
