import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

import {initialState, saveState} from './persistent-state';

export interface IExerciseState {
  points: number;
  solvedQuestions: number[];
}
export type ExerciseNumber = 1 | 2 | 3 | 4 | 5;
export interface IInitialState {
  date: number;
  byNumber: Record<ExerciseNumber, IExerciseState>;
}

const exercisesSlice = createSlice({
  name: 'EXERCISES',
  initialState,
  reducers: {
    overrideState: (state: Draft<IInitialState>, action: PayloadAction<IInitialState>) => action.payload,
    incrementPoints: (
      state: Draft<IInitialState>,
      action: PayloadAction<{task: ExerciseNumber; solvedByQuestionId: number}>
    ) => {
      const {task, solvedByQuestionId} = action.payload;
      state.byNumber[task].points += 1;
      state.byNumber[task].solvedQuestions.push(solvedByQuestionId);
      saveState(state);
    },
    addQuestionToSolvedPool: (
      state: Draft<IInitialState>,
      action: PayloadAction<{task: ExerciseNumber; solvedByQuestionId: number}>
    ) => {
      const {task, solvedByQuestionId} = action.payload;
      state.byNumber[task].solvedQuestions.push(solvedByQuestionId);
      saveState(state);
    },
  },
});

export default exercisesSlice;
