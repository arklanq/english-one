import {FormikHelpers} from 'formik/dist/types';
import {useCallback} from 'react';

import {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';
import exercisesSlice, {ExerciseNumber} from '@/redux-store/features/exercises/slice';
import {DispatchType} from '@/redux-store/models';

import ISimpleQuestion from '../models/ISimpleQuestion';
import {ILocalState} from './useLocalState';

export default function useSubmitHandler(
  state: ILocalState,
  reduxDispatch: DispatchType,
  points: number,
  skipQuestion: () => void
) {
  return useCallback(
    async (userAnswer: string, formikHelpers: FormikHelpers<IAnswerValues>) => {
      const {questions, activeQuestionIndex} = state;
      const question: ISimpleQuestion = questions[activeQuestionIndex];
      userAnswer = userAnswer.trim().toLowerCase();

      for (const answer of question.answers) {
        if (answer.value === userAnswer) {
          const actionPayload: {task: ExerciseNumber; solvedByQuestionId: number} = {
            task: 2,
            solvedByQuestionId: question.image.id,
          };

          await reduxDispatch(
            points < 10
              ? exercisesSlice.actions.incrementPoints(actionPayload)
              : exercisesSlice.actions.addQuestionToSolvedPool(actionPayload)
          );

          skipQuestion();
          return;
        }
      }

      formikHelpers.setFieldError('answer', 'Nieprawidłowa odpowiedź');
    },
    [state, reduxDispatch, skipQuestion]
  );
}
