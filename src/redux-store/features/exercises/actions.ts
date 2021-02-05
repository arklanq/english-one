import {DispatchType, ThunkFn} from '@/redux-store/models';

import {loadState} from './persistent-state';
import exercisesSlice, {IInitialState} from './slice';

export const loadExercisesStateAction: ThunkFn = () => async (dispatch: DispatchType) => {
  const state: IInitialState = await loadState();
  await dispatch(exercisesSlice.actions.overrideState(state));
};
