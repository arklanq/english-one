import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import darkTheme from '@/assets/theme/dark';
import lightTheme from '@/assets/theme/light';
import {ITheme} from '@/models/theme/ITheme';
import {selectColorSchemeInfo} from '@/redux-store/features/appearance/selectors';
import {ColorScheme, IColorSchemeInfo} from '@/redux-store/features/appearance/slice';

import createTheme from '../../../theme/createTheme';

export default function useThemePicker(): ITheme | null {
  const {system: systemColor, userPreference: userColor}: IColorSchemeInfo = useSelector(selectColorSchemeInfo);

  return useMemo(() => {
    if (!userColor) return null;

    const colorScheme: ColorScheme = userColor === 'automatic' ? systemColor : userColor;

    const theme: Partial<ITheme> = colorScheme === 'light' ? lightTheme : darkTheme;

    return createTheme(theme);
  }, [systemColor, userColor]);
}
