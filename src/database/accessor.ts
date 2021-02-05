import {WebSQLDatabase} from 'expo-sqlite';

let db: WebSQLDatabase | null = null;

export function getDB() {
  return db;
}

export function setDB(newDB: WebSQLDatabase) {
  db = newDB;
}
