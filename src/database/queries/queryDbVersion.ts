import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

interface IResultItem {
  value: string;
}

const sqlStatement = `SELECT value FROM info WHERE option='version';`;
const validationSchema = object().required().shape({
  value: number().required().positive().integer(),
});

export default async function queryDbVersion(db: WebSQLDatabase): Promise<number> {
  const results: SQLResultSet = await queryDatabase(db, {sqlStatement});

  if (results.rows.length < 1) throw new CorruptedDatabaseException("Couldn't fetch `db version number`.");

  const item: IResultItem | unknown = results.rows.item(0);
  try {
    const casted = validationSchema.cast(item);
    validateSync<IResultItem>(validationSchema, casted);
    return parseInt(casted.value, 10);
  } catch (e: unknown) {
    throw new CorruptedDatabaseException(
      "Couldn't parse `db version number` query results: " + getValidationErrorMessage(e)
    );
  }
}
