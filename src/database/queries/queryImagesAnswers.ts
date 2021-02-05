import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(variablesLength: number) {
  return `
    SELECT id, lookup.image_id as questionId, en_word as value
    FROM words
    INNER JOIN ex2__lookup lookup on words.id = lookup.word_id
    WHERE lookup.image_id IN (${new Array(variablesLength).fill('?').join(', ')}) AND id=lookup.word_id
    GROUP BY en_word;
  `;
}
const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  questionId: number().required().positive().integer(),
  value: string().required(),
});

export default async function queryImagesAnswers(db: WebSQLDatabase, imagesIds: number[]): Promise<IAnswer[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(imagesIds.length),
    args: imagesIds,
  });

  const answers: IAnswer[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IImage | unknown = results.rows.item(i);
    try {
      validateSync<IAnswer>(validationSchema, item);
      answers.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException(
        "Couldn't fetch `answers for image-questions` query results: " + getValidationErrorMessage(e)
      );
    }
  }

  return answers;
}
