import {useCallback, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {useDispatch} from 'react-redux';

import appSlice from '@/redux-store/features/app/slice';
import {DispatchType} from '@/redux-store/types';

export default function useAppStateController() {
  const dispatch: DispatchType = useDispatch();

  const appStateChangeListener = useCallback(
    (state: AppStateStatus) => {
      dispatch(appSlice.actions.setAppState(state));
    },
    [dispatch]
  );

  useEffect(() => {
    AppState.addEventListener('change', appStateChangeListener);

    return () => {
      AppState.removeEventListener('change', appStateChangeListener);
    };
  }, [appStateChangeListener]);
}
