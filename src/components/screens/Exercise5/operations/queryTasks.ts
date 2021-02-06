import {WebSQLDatabase} from 'expo-sqlite';

import queryPolishWords from '@/database/queries/queryPolishWords';
import queryPolishWordsAnswers from '@/database/queries/queryPolishWordsAnswers';
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
  const questions: IQuestion[] = await queryPolishWords(db, QUERY_TASKS_LIMIT, excludedIds);
  const answers: IAnswer[] = await queryPolishWordsAnswers(
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
