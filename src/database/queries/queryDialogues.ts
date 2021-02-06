import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IDialogue from '@/models/IDialogue';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(excludedIds: number[]) {
  return `
    SELECT id, dialogue_id as dialogueId, sequence, value as question 
    FROM ex2__questions
    WHERE id NOT IN (${new Array(excludedIds.length).fill('?').join(', ')}) 
    ORDER BY RANDOM() 
    LIMIT 1;`;
}

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  title: string().required(),
  introduction: string().required(),
});

export default async function queryDialogues(db: WebSQLDatabase, excludedIds: number[] = []): Promise<IDialogue> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(excludedIds),
    args: [...excludedIds],
  });

  const item: IDialogue | unknown = results.rows.item(0);
  try {
    validateSync<IDialogue>(validationSchema, item);
    return item;
  } catch (e: unknown) {
    throw new CorruptedDatabaseException("Couldn't fetch `dialogues` query results: " + getValidationErrorMessage(e));
  }
}
