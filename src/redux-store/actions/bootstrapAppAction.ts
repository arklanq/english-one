import ErrorReporting from '@/mechanisms/ErrorReporting';
import {loadFonts} from '@/redux-store/features/app/actions';
import appSlice from '@/redux-store/features/app/slice';
import {DispatchType, GetStateType, ThunkFn} from '@/redux-store/types';

export const bootstrapAppAction: ThunkFn = () => async (dispatch: DispatchType, _getState: GetStateType) => {
  try {
    await loadFonts();
    await dispatch(appSlice.actions.setAppReady(true));
  } catch (e: unknown) {
    ErrorReporting.captureError(e);
  }
};
