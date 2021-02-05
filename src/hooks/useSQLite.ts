import {WebSQLDatabase} from 'expo-sqlite';
import {useContext} from 'react';

import {SQLiteContext} from '@/contexts/SQLiteContext';

export default function useSQLite(): WebSQLDatabase {
  return useContext(SQLiteContext);
}
