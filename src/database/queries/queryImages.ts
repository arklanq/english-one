import {WebSQLDatabase} from 'expo-sqlite';
import {SQLResultSet} from 'expo-sqlite/src/SQLite.types';
import {number, object, string} from 'yup';

import queryDatabase from '@/database/methods/queryDatabase';
import CorruptedDatabaseException from '@/exceptions/CorruptedDatabaseException';
import IImage from '@/models/IImage';
import {getValidationErrorMessage, validateSync} from '@/utils/yup-utils';

function prepareSqlStatement(excludedIds: number[]) {
  return `
    SELECT id, image_url as imageUrl 
    FROM ex2__images 
    WHERE id NOT IN (${new Array(excludedIds.length).fill('?').join(', ')}) 
    ORDER BY RANDOM() 
    LIMIT ?;`;
}

const validationSchema = object().required().camelCase().shape({
  id: number().required().positive().integer(),
  imageUrl: string().required(),
});

export default async function queryImages(
  db: WebSQLDatabase,
  limit: number = 3,
  excludedIds: number[] = []
): Promise<IImage[]> {
  const results: SQLResultSet = await queryDatabase(db, {
    sqlStatement: prepareSqlStatement(excludedIds),
    args: [...excludedIds, limit],
  });

  const images: IImage[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const item: IImage | unknown = results.rows.item(i);
    try {
      validateSync<IImage>(validationSchema, item);
      images.push(item);
    } catch (e: unknown) {
      throw new CorruptedDatabaseException("Couldn't fetch `images` query results: " + getValidationErrorMessage(e));
    }
  }

  return images;
}
