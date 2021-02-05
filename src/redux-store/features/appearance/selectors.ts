import {IColorSchemeInfo} from '@/redux-store/features/appearance/slice';
import {RootState} from '@/redux-store/models';

export function selectColorSchemeInfo(state: RootState): IColorSchemeInfo {
  return state.appearance.colorScheme;
}
