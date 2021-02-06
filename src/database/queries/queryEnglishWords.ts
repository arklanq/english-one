import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IQuestion from '@/models/IQuestion';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(excludedWords: string[]) {
  return `SELECT id, en_word as question FROM words WHERE en_word NOT IN (${new Array(excludedWords.length)
    .fill('?')
    .join(', ')}) GROUP BY question ORDER BY RANDOM() LIMIT ?;`;
}

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  question: string().required(),
});

export default async function queryEnglishWords(
  db: WebSQLDatabase,
  limit: number = 3,
  excludedWords: string[] = []
): Promise<IQuestion[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(excludedWords),
    args: [...excludedWords, limit],
  });

  const images: IQuestion[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IQuestion | unknown = results.rows.item(i);
    try {
      validateSync<IQuestion>(validationSchema, item);
      images.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `english words` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return images;
}
