import {RootState} from '@/redux-store/models';

export function selectDatabaseVersion(state: RootState): number | null {
  return state.database.status === 'available' ? state.database.version : null;
}
