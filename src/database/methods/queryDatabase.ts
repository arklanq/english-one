import {WebSQLDatabase} from 'expo-sqlite';
import {SQLError, SQLResultSet, SQLTransaction} from 'expo-sqlite/src/SQLite.types';

export interface ISQLQuery {
  sqlStatement: string;
  args?: unknown[];
}

export default async function queryDatabase(db: WebSQLDatabase, query: ISQLQuery): Promise<SQLResultSet> {
  return new Promise((resolve, reject) => {
    let results: SQLResultSet | undefined;

    db.transaction(
      (transaction) => {
        transaction.executeSql(
          query.sqlStatement,
          query.args,
          (transaction: SQLTransaction, resultSet: SQLResultSet) => (results = resultSet)
        );
      },
      (err: SQLError) => reject(err),
      () => {
        if (results === undefined) reject(new Error('Missing `results`.'));
        else resolve(results);
      }
    );
  });
}
