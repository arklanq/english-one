import {WebSQLDatabase} from 'expo-sqlite';
import React, {createContext, ReactNode} from 'react';

export interface ISQLiteProviderProps {
  children: ReactNode;
  database: WebSQLDatabase;
}

export const SQLiteContext = createContext<WebSQLDatabase>({} as WebSQLDatabase);

export function SQLiteProvider(props: ISQLiteProviderProps) {
  const {children, database} = props;

  return <SQLiteContext.Provider value={database}>{children}</SQLiteContext.Provider>;
}
