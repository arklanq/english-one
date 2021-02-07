import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IDialogue from '@/models/IDialogue';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

const sqlStatement = `
  SELECT id, title, introduction FROM ex2__dialogues
  WHERE id=?
  ORDER BY RANDOM() 
  LIMIT 1;
`;

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  title: string().required(),
  introduction: string().required(),
});

export default async function queryDialogue(db: WebSQLDatabase, dialogueId: number): Promise<IDialogue> {
  const results: SQLResultSet = await queryDatabase(db, {sqlStatement, args: [dialogueId]});

  const item: IDialogue | unknown = results.rows.item(0);
  try {
    validateSync<IDialogue>(validationSchema, item);
    return item;
  } catch (e: unknown) {
    throw new CorruptedDatabaseException("Couldn't fetch `dialogues` query results: " + getValidationErrorMessage(e));
  }
}
