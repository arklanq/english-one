import {FormikProps} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import {Dispatch, MutableRefObject, useCallback} from 'react';

import {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';
import exercisesSlice, {ExerciseNumber} from '@/redux-store/features/exercises/slice';
import {DispatchType} from '@/redux-store/models';

import ITranslateWordTask from '../models/ITranslateWordTask';
import {Action, ILocalState} from './useLocalState';

export default function useSubmitHandler(
  state: ILocalState,
  dispatch: Dispatch<Action>,
  reduxDispatch: DispatchType,
  formikRef: MutableRefObject<FormikProps<IAnswerValues> | null>,
  points: number
) {
  return useCallback(
    async (userAnswer: string, formikHelpers: FormikHelpers<IAnswerValues>) => {
      const {tasks, activeTaskIndex, userInteraction} = state;
      const task: ITranslateWordTask = tasks[activeTaskIndex];
      const shouldShowCongratsInfo = points + 1 === 10 && !userInteraction.dismissedCongratsScreen;
      userAnswer = userAnswer.trim().toLowerCase();

      for (const answer of task.answers) {
        if (answer.value === userAnswer) {
          const actionPayload: {task: ExerciseNumber; solvedByQuestionId: number} = {
            task: 4,
            solvedByQuestionId: task.question.id,
          };

          await reduxDispatch(
            points < 10
              ? exercisesSlice.actions.incrementPoints(actionPayload)
              : exercisesSlice.actions.addQuestionToSolvedPool(actionPayload)
          );

          if (activeTaskIndex < tasks.length) {
            if (!shouldShowCongratsInfo) formikRef.current?.resetForm({});

            dispatch({type: 'submitTask', payload: {index: activeTaskIndex}});
          }
          return;
        }
      }

      formikHelpers.setFieldError('answer', 'Nieprawidłowa odpowiedź');
    },
    [state, dispatch, reduxDispatch, formikRef, points]
  );
}
