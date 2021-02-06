import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IQuestion from '@/models/IQuestion';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(excludedWordsCount: number) {
  return `
    SELECT id, word as question 
    FROM english_words 
    WHERE id NOT IN (${new Array(excludedWordsCount).fill('?').join(', ')}) 
    GROUP BY question 
    ORDER BY RANDOM() 
    LIMIT ?;
  `;
}

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  question: string().required(),
});

export default async function queryEnglishWords(
  db: WebSQLDatabase,
  limit: number = 3,
  excludedWords: number[] = []
): Promise<IQuestion[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(excludedWords.length),
    args: [...excludedWords, limit],
  });

  const questions: IQuestion[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IQuestion | unknown = results.rows.item(i);
    try {
      validateSync<IQuestion>(validationSchema, item);
      questions.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `english-words` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return questions;
}
