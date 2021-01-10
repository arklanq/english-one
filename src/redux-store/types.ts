import {rootReducer} from './rootReducer';
import {store} from './store';

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;
export type GetStateType = () => RootState;
//export type Thunk<R = void> = ThunkAction<R, RootState, unknown, Action<string>>;
export type Thunk<R = void> = (dispatch: DispatchType, getState: GetStateType) => Promise<R>;
export type ThunkFn<A extends unknown[] = unknown[], R = void> = (...args: A) => Thunk<R>;
