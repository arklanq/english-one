import {FormikProps} from 'formik';
import {Dispatch, MutableRefObject, useCallback} from 'react';

import {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';

import {Action, ILocalState} from './useLocalState';

export default function useQuestionSkipHandler(
  state: ILocalState,
  dispatch: Dispatch<Action>,
  formikRef: MutableRefObject<FormikProps<IAnswerValues> | null>,
  points: number
) {
  return useCallback(() => {
    const {questions, activeQuestionIndex, userInteraction} = state;
    const shouldShowCongratsInfo = points + 1 === 10 && !userInteraction.dismissedCongratsScreen;

    if (activeQuestionIndex < questions.length) {
      if (!shouldShowCongratsInfo) formikRef.current?.resetForm({});
      dispatch({type: 'setActiveQuestionIndex', payload: activeQuestionIndex + 1});
    }
  }, [formikRef, state, dispatch, points]);
}
