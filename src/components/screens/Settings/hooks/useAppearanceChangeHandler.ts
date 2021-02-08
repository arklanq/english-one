import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {selectColorSchemeInfo} from '@/redux-store/features/appearance/selectors';
import appearanceSlice, {IColorSchemeInfo} from '@/redux-store/features/appearance/slice';
import {DispatchType} from '@/redux-store/models';

export default function useAppearanceChangeHandler() {
  const {userPreference}: IColorSchemeInfo = useSelector(selectColorSchemeInfo);
  const dispatch: DispatchType = useDispatch();

  return useCallback(async () => {
    const nextColorScheme = userPreference === 'light' ? 'dark' : userPreference === 'dark' ? 'automatic' : 'light';
    await dispatch(appearanceSlice.actions.setUserPreferredColorScheme(nextColorScheme));
  }, [userPreference, dispatch]);
}
