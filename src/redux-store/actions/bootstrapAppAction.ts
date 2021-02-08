import {serializeError} from 'serialize-error';

import ErrorReporting from '@/mechanisms/ErrorReporting';
import {loadFontsAction} from '@/redux-store/features/app/actions';
import appSlice from '@/redux-store/features/app/slice';
import {loadAppearanceStateAction} from '@/redux-store/features/appearance/actions';
import {prepareSQLiteAction} from '@/redux-store/features/database/actions';
import {loadExercisesStateAction} from '@/redux-store/features/exercises/actions';
import {determineInitialNetworkInfoAction} from '@/redux-store/features/network/actions';
import {DispatchType, GetStateType, ThunkFn} from '@/redux-store/models';

export const bootstrapAppAction: ThunkFn = () => async (dispatch: DispatchType, _getState: GetStateType) => {
  try {
    await Promise.all([
      dispatch(loadFontsAction()),
      dispatch(determineInitialNetworkInfoAction()),
      dispatch(prepareSQLiteAction()),
      dispatch(loadExercisesStateAction()),
      dispatch(loadAppearanceStateAction()),
    ]);
    await dispatch(appSlice.actions.setAppStatus({status: 'ready'}));
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
