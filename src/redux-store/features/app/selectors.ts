import {RootState} from '@/redux-store/types';

export function selectIsAppReady(state: RootState): boolean {
  return state.app.status === 'ready';
}
