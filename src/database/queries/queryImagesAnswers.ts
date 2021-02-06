import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(imagesIdsCount: number) {
  return `
    SELECT ANSWERS.image_id as questionId, ENG.id AS id, ENG.word AS value
    FROM ex3__answers AS ANSWERS
    INNER JOIN english_words as ENG ON ENG.id = ANSWERS.en_word_id
    WHERE ANSWERS.image_id IN (${new Array(imagesIdsCount).fill('?').join(', ')})
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
