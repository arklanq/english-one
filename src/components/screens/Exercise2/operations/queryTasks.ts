import {WebSQLDatabase} from 'expo-sqlite';

import queryImages from '@/database/queries/queryImages';
import queryImagesAnswers from '@/database/queries/queryImagesAnswers';
import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';

import IGuessImageTask from '../models/IGuessImageTask';

const QUERY_TASKS_LIMIT = 3;

export default async function queryTasks(
  db: WebSQLDatabase,
  poolTasks: number[],
  solvedTasks: number[],
  skippedTasks: number[]
): Promise<IGuessImageTask[]> {
  const excludedIds = Array.from(new Set(poolTasks.concat(solvedTasks, skippedTasks)).values());
  const images: IImage[] = await queryImages(db, QUERY_TASKS_LIMIT, excludedIds);
  const answers: IAnswer[] = await queryImagesAnswers(
    db,
    images.map((image: IImage) => image.id)
  );
  const tasks: IGuessImageTask[] = [];

  for (const image of images) {
    tasks.push({
      image,
      answers: answers.filter((answer: IAnswer) => answer.questionId === image.id),
    });
  }

  return tasks;
}
