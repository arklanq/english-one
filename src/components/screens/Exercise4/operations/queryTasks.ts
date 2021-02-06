import {WebSQLDatabase} from 'expo-sqlite';

import queryEnglishWords from '@/database/queries/queryEnglishWords';
import queryEnglishWordsAnswers from '@/database/queries/queryEnglishWordsAnswers';
import IAnswer from '@/models/IAnswer';
import IQuestion from '@/models/IQuestion';

import ITranslateWordTask from '../models/ITranslateWordTask';

const QUERY_TASKS_LIMIT = 3;

export default async function queryTasks(
  db: WebSQLDatabase,
  actualTasks: number[],
  solvedTasks: number[],
  skippedTasks: number[]
): Promise<ITranslateWordTask[]> {
  const excludedIds = Array.from(new Set(actualTasks.concat(solvedTasks, skippedTasks)).values());
  const questions: IQuestion[] = await queryEnglishWords(db, QUERY_TASKS_LIMIT, excludedIds);
  const answers: IAnswer[] = await queryEnglishWordsAnswers(
    db,
    questions.map((question: IQuestion) => question.id)
  );
  const tasks: ITranslateWordTask[] = [];

  for (const question of questions) {
    tasks.push({
      question,
      answers: answers.filter((answer: IAnswer) => answer.questionId === question.id),
    });
  }

  return tasks;
}
