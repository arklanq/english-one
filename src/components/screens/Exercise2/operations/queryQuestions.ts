import {WebSQLDatabase} from 'expo-sqlite';

import queryImages from '@/database/queries/queryImages';
import queryImagesAnswers from '@/database/queries/queryImagesAnswers';
import IAnswer from '@/models/IAnswer';
import IImage from '@/models/IImage';

import ISimpleQuestion from '../models/ISimpleQuestion';

const QUERY_QUESTIONS_LIMIT = 3;

export default async function queryQuestions(
  db: WebSQLDatabase,
  lastQuestionId: number,
  alreadySolvedQuestions: number[]
): Promise<ISimpleQuestion[]> {
  const images: IImage[] = await queryImages(db, QUERY_QUESTIONS_LIMIT, lastQuestionId, alreadySolvedQuestions);
  const answers: IAnswer[] = await queryImagesAnswers(
    db,
    images.map((image: IImage) => image.id)
  );
  const simpleQuestions: ISimpleQuestion[] = [];

  for (const image of images) {
    simpleQuestions.push({
      image,
      answers: answers.filter((answer: IAnswer) => answer.questionId === image.id),
    });
  }

  return simpleQuestions;
}
