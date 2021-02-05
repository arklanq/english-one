import {WebSQLDatabase} from 'expo-sqlite';

import {setDB} from '@/database/accessor';
import openDatabase from '@/database/methods/openDatabase';
import queryDbVersion from '@/database/queries/queryDbVersion';
import {DispatchType, ThunkFn} from '@/redux-store/models';

import databaseSlice from './slice';

export const prepareSQLiteAction: ThunkFn = () => async (dispatch: DispatchType) => {
  const db: WebSQLDatabase = await openDatabase();
  setDB(db);
  const version = await queryDbVersion(db);
  await dispatch(databaseSlice.actions.setVersion(version));
};
