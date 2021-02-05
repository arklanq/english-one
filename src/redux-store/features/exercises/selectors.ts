import {ExerciseNumber} from '@/redux-store/features/exercises/slice';
import {RootState} from '@/redux-store/models';

export function selectExercisePoints(exerciseNumber: ExerciseNumber): (state: RootState) => number {
  return (state: RootState) => state.exercises.byNumber[exerciseNumber].points;
}

export type AllExercisesPoints = Record<ExerciseNumber, number>;

export function selectAllExercisesPoints(state: RootState): AllExercisesPoints {
  return ([1, 2, 3, 4, 5] as ExerciseNumber[]).reduce(
    (allExercises: Partial<AllExercisesPoints>, exerciseNumber: ExerciseNumber) => {
      allExercises[exerciseNumber] = state.exercises.byNumber[exerciseNumber].points;
      return allExercises;
    },
    {} as Partial<AllExercisesPoints>
  ) as AllExercisesPoints;
}

export function selectExerciseSolvedQuestions(exerciseNumber: ExerciseNumber): (state: RootState) => number[] {
  return (state: RootState) => state.exercises.byNumber[exerciseNumber].solvedQuestions;
}

export function selectExercisesOverallProgress(state: RootState): number {
  return ([1, 2, 3, 4, 5] as ExerciseNumber[]).reduce(
    (total: number, excerciseNumber: ExerciseNumber) => total + state.exercises.byNumber[excerciseNumber].points,
    0
  );
}
