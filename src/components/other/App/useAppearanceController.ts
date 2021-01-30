import {useCallback, useEffect} from 'react';
import {Appearance, ColorSchemeName} from 'react-native';
import {useDispatch} from 'react-redux';

import appearanceSlice from '@/redux-store/features/appearance/slice';
import {DispatchType} from '@/redux-store/types';

type AppearancePreferences = {
  colorScheme: ColorSchemeName;
};

export default function useAppearanceController() {
  const dispatch: DispatchType = useDispatch();

  const appearanceChangeListener = useCallback(
    async (appearance: AppearancePreferences) => {
      await dispatch(appearanceSlice.actions.setSystemColorScheme(appearance.colorScheme ?? 'light'));
    },
    [dispatch]
  );

  useEffect(() => {
    Appearance.addChangeListener(appearanceChangeListener);

    return () => {
      Appearance.removeChangeListener(appearanceChangeListener);
    };
  }, [appearanceChangeListener]);
}
