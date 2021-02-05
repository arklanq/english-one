import {useMemo} from 'react';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';

import {ITheme} from '@/models/theme/ITheme';
import convertToPaperTheme from '@/theme/utilities/convertToPaperTheme';

export default function usePaperThemePicker(theme: ITheme): PaperTheme {
  return useMemo(() => convertToPaperTheme(theme), [theme]);
}
