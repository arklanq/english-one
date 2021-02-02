import {combineReducers} from 'redux';

import appSlice from './features/app/slice';
import appearanceSlice from './features/appearance/slice';
import exercisesSlice from './features/exercises/slice';
import networkSlice from './features/network/slice';

export const rootReducer = combineReducers({
  app: appSlice.reducer,
  appearance: appearanceSlice.reducer,
  network: networkSlice.reducer,
  exercises: exercisesSlice.reducer,
});
