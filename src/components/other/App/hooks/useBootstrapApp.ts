import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import usePrevious from '@/hooks/usePrevious';
import {bootstrapAppAction} from '@/redux-store/actions/bootstrapAppAction';
import {selectIsAppReady} from '@/redux-store/features/app/selectors';
import {DispatchType} from '@/redux-store/models';

export default function useBootstrapApp() {
  const dispatch: DispatchType = useDispatch();
  const isAppReady: boolean = useSelector(selectIsAppReady);
  const prevWasAppReady: boolean | undefined = usePrevious(isAppReady);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(() => {
      dispatch(bootstrapAppAction());
    });
  }, [dispatch]);

  useEffect(() => {
    if (!prevWasAppReady && isAppReady) SplashScreen.hideAsync();
  }, [prevWasAppReady, isAppReady]);
}
