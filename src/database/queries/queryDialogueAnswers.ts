import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {boolean, number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IAnswer from '@/models/IAnswer';
import IDialogAnswer from '@/models/IDialogAnswer';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(questionsCount: number) {
  return `
    SELECT id, question_id as questionId, value, is_correct as isCorrect, helper_text as helperText
    FROM ex2__answers
    WHERE questionId IN (${new Array(questionsCount).fill('?').join(', ')})
  `;
}
const validationSchema = object()
  .required()
  .camelCase()
  .shape({
    id: number().required().positive().integer(),
    questionId: number().required().positive().integer(),
    value: string().required(),
    isCorrect: boolean().required(),
    helperText: string().when('isCorrect', {
      is: true,
      then: string().optional(),
      otherwise: string().required(),
    }),
  });

export default async function queryDialogueAnswers(db: WebSQLDatabase, questionsIds: number[]): Promise<IAnswer[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(questionsIds.length),
    args: questionsIds,
  });

  const answers: IDialogAnswer[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IDialogAnswer | unknown = results.rows.item(i);
    try {
      const castedItem = validationSchema.cast(item);
      validateSync<IDialogAnswer>(validationSchema, castedItem);
      answers.push(castedItem);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `answers for dialogues` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return answers;
}
