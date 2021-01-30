import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import darkTheme from '@/assets/theme/dark';
import lightTheme from '@/assets/theme/light';
import {ITheme} from '@/models/theme/ITheme';
import {selectColorSchemeInfo} from '@/redux-store/features/appearance/selectors';
import {ColorScheme, IColorSchemeInfo} from '@/redux-store/features/appearance/slice';

import createTheme, {IThemePrototype} from '../../../theme/createTheme';

export default function useThemePicker(): ITheme {
  const {system: systemColor, userPreference: userColor}: IColorSchemeInfo = useSelector(selectColorSchemeInfo);

  return useMemo(() => {
    const colorScheme: ColorScheme = userColor === 'automatic' ? systemColor : userColor;

    const theme: IThemePrototype = colorScheme === 'light' ? lightTheme : darkTheme;

    return createTheme(theme);
  }, [systemColor, userColor]);
}
