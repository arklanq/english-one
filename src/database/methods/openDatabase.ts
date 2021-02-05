import {Asset} from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import {WebSQLDatabase} from 'expo-sqlite';

const DB_NAME = 'identifier.sqlite';

export default async function openDatabase(): Promise<WebSQLDatabase> {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists)
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');

  await FileSystem.downloadAsync(
    Asset.fromModule(require(`../../assets/db/${DB_NAME}`)).uri,
    FileSystem.documentDirectory + `SQLite/${DB_NAME}`
  );

  return SQLite.openDatabase(DB_NAME);
}
