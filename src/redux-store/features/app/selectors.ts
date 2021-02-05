import {RootState} from '@/redux-store/models';

export function selectIsAppReady(state: RootState): boolean {
  return state.app.status === 'ready';
}
