import {TaskNumber} from '@/redux-store/features/exercises/slice';
import {RootState} from '@/redux-store/types';

export function selectExercisesOverallProgress(state: RootState): number {
  return ([1, 2, 3, 4, 5] as TaskNumber[]).reduce(
    (total: number, excerciseNumber: TaskNumber) => total + state.exercises[excerciseNumber].points,
    0
  );
}
