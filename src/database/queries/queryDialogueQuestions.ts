import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IDialogueQuestion from '@/models/IDialogueQuestion';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

const sqlStatement = `
  SELECT id, dialogue_id as dialogueId, sequence, value as question 
  FROM ex2__questions
  WHERE dialogueId=?;
`;

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  dialogueId: number().required().positive().integer(),
  sequence: number().required().positive().integer(),
  question: string().required(),
});

export default async function queryDialogueQuestions(
  db: WebSQLDatabase,
  dialogueId: number
): Promise<IDialogueQuestion[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement,
    args: [dialogueId],
  });

  const questions: IDialogueQuestion[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IDialogueQuestion | unknown = results.rows.item(i);
    try {
      validateSync<IDialogueQuestion>(validationSchema, item);
      questions.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `questions for dialogues` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return questions;
}
