import {FormikProps} from 'formik';
import {Dispatch, MutableRefObject, useCallback} from 'react';

import {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';
import IGuessImageTask from '@/components/screens/Exercise2/models/IGuessImageTask';

import {Action, ILocalState} from './useLocalState';

export default function useQuestionSkipHandler(
  state: ILocalState,
  dispatch: Dispatch<Action>,
  formikRef: MutableRefObject<FormikProps<IAnswerValues> | null>,
  points: number
) {
  return useCallback(() => {
    const {tasks, activeTaskIndex, userInteraction} = state;
    const task: IGuessImageTask = tasks[activeTaskIndex];
    const shouldShowCongratsInfo = points + 1 === 10 && !userInteraction.dismissedCongratsScreen;

    if (activeTaskIndex < tasks.length) {
      if (!shouldShowCongratsInfo) formikRef.current?.resetForm({});

      dispatch({type: 'skipTask', payload: {index: activeTaskIndex, skippedTaskId: task.image.id}});
    }
  }, [state, dispatch, formikRef, points]);
}
