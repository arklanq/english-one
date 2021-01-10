import {useSelector} from 'react-redux';

import {selectColorSchemeInfo} from '@/redux-store/features/appearance/selectors';
import {IColorSchemeInfo} from '@/redux-store/features/appearance/slice';

export default function useColorScheme() {
  const colorSchemeInfo: IColorSchemeInfo = useSelector(selectColorSchemeInfo);
  return !colorSchemeInfo.userPreference || colorSchemeInfo.userPreference === 'automatic'
    ? colorSchemeInfo.system
    : colorSchemeInfo.userPreference;
}
