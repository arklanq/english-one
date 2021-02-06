import {FormikProps} from 'formik';
import {Dispatch, MutableRefObject, useCallback} from 'react';

import {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';

import ITranslateWordTask from '../models/ITranslateWordTask';
import {Action, ILocalState} from './useLocalState';

export default function useQuestionSkipHandler(
  state: ILocalState,
  dispatch: Dispatch<Action>,
  formikRef: MutableRefObject<FormikProps<IAnswerValues> | null>,
  points: number
) {
  return useCallback(() => {
    const {tasks, activeTaskIndex, userInteraction} = state;
    const task: ITranslateWordTask = tasks[activeTaskIndex];
    const shouldShowCongratsInfo = points + 1 === 10 && !userInteraction.dismissedCongratsScreen;

    if (activeTaskIndex < tasks.length) {
      if (!shouldShowCongratsInfo) formikRef.current?.resetForm({});

      dispatch({type: 'skipTask', payload: {index: activeTaskIndex, skippedTaskId: task.question.id}});
    }
  }, [state, dispatch, formikRef, points]);
}
