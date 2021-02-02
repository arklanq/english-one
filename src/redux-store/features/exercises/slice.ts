import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

export interface IExerciseState {
  points: number;
}
export type TaskNumber = 1 | 2 | 3 | 4 | 5;
export type IInitialState = Record<TaskNumber, IExerciseState>;

export const initialState: IInitialState = {
  1: {points: 0},
  2: {points: 0},
  3: {points: 0},
  4: {points: 0},
  5: {points: 0},
};

const exercisesSlice = createSlice({
  name: 'EXERCISES',
  initialState,
  reducers: {
    incrementPoints: (state: Draft<IInitialState>, action: PayloadAction<{task: TaskNumber}>) => {
      state[action.payload.task].points += 1;
    },
  },
});

export default exercisesSlice;
