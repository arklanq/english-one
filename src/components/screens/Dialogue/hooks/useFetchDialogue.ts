import {WebSQLDatabase} from 'expo-sqlite';
import {Dispatch, useCallback, useEffect} from 'react';

import ICompleteDialogue from '@/components/screens/Dialogue/models/ICompleteDialogue';
import ICompleteDialogueQuestion from '@/components/screens/Dialogue/models/ICompleteDialogueQuestion';
import queryDialogue from '@/database/queries/queryDialogue';
import queryDialogueAnswers from '@/database/queries/queryDialogueAnswers';
import queryDialogueQuestions from '@/database/queries/queryDialogueQuestions';
import useIsMounted from '@/hooks/useIsMounted';
import useSQLite from '@/hooks/useSQLite';
import ErrorReporting from '@/mechanisms/ErrorReporting';
import IDialogueAnswer from '@/models/IDialogueAnswer';
import IDialogueQuestion from '@/models/IDialogueQuestion';
import {shuffleArray} from '@/utils/array-utils';

import {Action} from './useLocalState';

type PartialCompleteDialogue = Omit<ICompleteDialogue, 'questions'> & Partial<Pick<ICompleteDialogue, 'questions'>>;
type PartialCompleteDialogueQuestion = Omit<ICompleteDialogueQuestion, 'answers'> &
  Partial<Pick<ICompleteDialogueQuestion, 'answers'>>;
type QuestionsAndAnswers = [ICompleteDialogueQuestion[], IDialogueAnswer[]];

export default function useFetchDialogue(dialogueId: number, dispatch: Dispatch<Action>) {
  const isMounted: () => boolean = useIsMounted();
  const db: WebSQLDatabase = useSQLite();

  const runAsync = useCallback(async () => {
    try {
      const [dialogue, [questions, answers]]: [PartialCompleteDialogue, QuestionsAndAnswers] = await Promise.all([
        queryDialogue(db, dialogueId),
        queryDialogueQuestions(db, dialogueId).then(
          (questions: IDialogueQuestion[]) =>
            new Promise<QuestionsAndAnswers>((resolve) =>
              queryDialogueAnswers(
                db,
                questions.map((question: PartialCompleteDialogueQuestion) => question.id)
              ).then((answers: IDialogueAnswer[]) =>
                resolve([
                  questions
                    .map((question: PartialCompleteDialogueQuestion) => {
                      question.answers = [];
                      return question as ICompleteDialogueQuestion;
                    })
                    .sort((questionA: ICompleteDialogueQuestion, questionB: ICompleteDialogueQuestion) =>
                      questionA.sequence > questionB.sequence ? 1 : -1
                    ),
                  answers,
                ])
              )
            )
        ),
      ]);

      for (const question of questions) {
        for (const answer of answers) {
          if (answer.questionId === question.id) question.answers.push(answer);
        }

        shuffleArray(question.answers);
      }

      dialogue.questions = questions;

      if (isMounted()) dispatch({type: 'setActiveDialogue', payload: dialogue as ICompleteDialogue});
    } catch (e: unknown) {
      ErrorReporting.captureError(e);
      if (isMounted()) dispatch({type: 'setErrorStatus', payload: undefined});
    }
  }, [db]);

  useEffect(() => {
    runAsync();
  }, [runAsync]);
}
