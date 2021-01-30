import * as SplashScreen from 'expo-splash-screen';
import {serializeError} from 'serialize-error';

import ErrorReporting from '@/mechanisms/ErrorReporting';
import {loadFontsAction} from '@/redux-store/features/app/actions';
import appSlice from '@/redux-store/features/app/slice';
import {determineInitialNetworkInfoAction} from '@/redux-store/features/network/actions';
import {DispatchType, GetStateType, ThunkFn} from '@/redux-store/types';

export const bootstrapAppAction: ThunkFn = () => async (dispatch: DispatchType, _getState: GetStateType) => {
  try {
    await SplashScreen.preventAutoHideAsync();
    await Promise.all([dispatch(loadFontsAction()), dispatch(determineInitialNetworkInfoAction())]);
    await dispatch(appSlice.actions.setAppStatus({status: 'ready'}));
    await SplashScreen.hideAsync();
  } catch (e: unknown) {
    ErrorReporting.captureError(e);
    await dispatch(
      appSlice.actions.setAppStatus({
        status: 'error',
        error: serializeError(e),
      })
    );
  }
};
