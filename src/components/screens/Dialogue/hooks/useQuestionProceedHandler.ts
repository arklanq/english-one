import {Dispatch, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ScreenNavigationProp, StackParamList} from '@/components/other/Router';
import {selectExercisePoints} from '@/redux-store/features/exercises/selectors';
import exercisesSlice from '@/redux-store/features/exercises/slice';
import {DispatchType} from '@/redux-store/models';

import {Action, ILocalState} from './useLocalState';

export default function useQuestionProceedHandler(
  state: ILocalState,
  dispatch: Dispatch<Action>,
  navigation: ScreenNavigationProp<keyof StackParamList>
) {
  const reduxDispatch: DispatchType = useDispatch();
  const points: number = useSelector(selectExercisePoints(3));

  return useCallback(async () => {
    if (state.status === 'success') {
      const {
        dialogue: {active, sequence},
      } = state;

      if (sequence >= active.questions.length - 1) {
        await reduxDispatch(
          exercisesSlice.actions.incrementPoints({
            task: 3,
            solvedByQuestionId: active.id,
            points: points < 10 ? 5 : 0,
          })
        );
        navigation.goBack();
      } else dispatch({type: 'incrementSequence', payload: undefined});
    }
  }, [state, dispatch, points, navigation]);
}
