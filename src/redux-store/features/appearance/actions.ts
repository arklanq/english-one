import {DispatchType, ThunkFn} from '@/redux-store/models';

import {loadState} from './persistent-state';
import appearanceSlice, {IInitialState} from './slice';

export const loadAppearanceStateAction: ThunkFn = () => async (dispatch: DispatchType) => {
  const state: IInitialState = await loadState();
  await dispatch(appearanceSlice.actions.overrideState(state));
};
