import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(wordsIdsCount: number) {
  return `
    SELECT LOOKUP.english_word AS id, LOOKUP.polish_word AS questionId, EN.word AS value
    FROM words_lookup AS LOOKUP
    INNER JOIN english_words AS EN ON EN.id=LOOKUP.english_word
    WHERE LOOKUP.polish_word IN (${new Array(wordsIdsCount).fill('?').join(', ')})
  `;
}
const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  questionId: number().required().positive().integer(),
  value: string().required(),
});

export default async function queryPolishWordsAnswers(db: WebSQLDatabase, wordsIds: number[]): Promise<IAnswer[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(wordsIds.length),
    args: wordsIds,
  });

  const answers: IAnswer[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IImage | unknown = results.rows.item(i);
    try {
      validateSync<IAnswer>(validationSchema, item);
      answers.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `answers for polish-words` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return answers;
}
