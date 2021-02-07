import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IDialogueInfo from '@/models/IDialogueInfo';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

const sqlStatement = `SELECT id, title FROM ex2__dialogues;`;

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  title: string().required(),
});

export default async function queryDialogueList(db: WebSQLDatabase): Promise<IDialogueInfo[]> {
  const results: SQLResultSet = await queryDatabase(db, {sqlStatement});
  const items: IDialogueInfo[] = [];

  for (let i = 0; i < results.rows.length; i++) {
    const item: IDialogueInfo | unknown = results.rows.item(i);
    try {
      validateSync<IDialogueInfo>(validationSchema, item);
      items.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `dialogue list` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return items;
}
