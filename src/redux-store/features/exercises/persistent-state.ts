import {array, number, object} from 'yup';

import AsyncStorage from '@/mechanisms/AsyncStorage';
import ErrorReporting from '@/mechanisms/ErrorReporting';
import {doesCalendarDayDiffer} from '@/utils/dates-utils';
import {validateSync} from '@/utils/yup-utils';

import {IInitialState} from './slice';

export const initialState: IInitialState = {
  date: new Date().getTime(),
  byNumber: {
    1: {points: 0, solvedQuestions: []},
    2: {points: 0, solvedQuestions: []},
    3: {points: 0, solvedQuestions: []},
    4: {points: 0, solvedQuestions: []},
    5: {points: 0, solvedQuestions: []},
  },
};
const STORAGE_KEY = 'exercises';
const exerciseValidation = object()
  .required()
  .shape({
    points: number().required().integer(),
    solvedQuestions: array().required().of(number().required().positive().integer()),
  });
const stateValidation = object()
  .required()
  .shape({
    date: number().required().positive().integer(),
    byNumber: object().required().shape({
      1: exerciseValidation,
      2: exerciseValidation,
      3: exerciseValidation,
      4: exerciseValidation,
      5: exerciseValidation,
    }),
  });

export async function saveState(state: IInitialState): Promise<void> {
  await AsyncStorage.setJsonItem(STORAGE_KEY, state);
}

export async function purgeState(): Promise<void> {
  await AsyncStorage.unsetItem(STORAGE_KEY);
}

export async function loadState(): Promise<IInitialState> {
  let data: IInitialState | unknown;
  try {
    data = await AsyncStorage.getJsonItem(STORAGE_KEY);
  } catch (e: unknown) {
    ErrorReporting.captureError(e, 'Encountered unknown error while loading `exercises state` from AsyncStorage.');
    await purgeState();
    return initialState;
  }

  if (data === null) return initialState;

  try {
    validateSync<IInitialState>(stateValidation, data);
  } catch (e: unknown) {
    ErrorReporting.captureError(e, 'Found corrupted `exercises state` in AsyncStorage.');
    await purgeState();
    return initialState;
  }

  if (doesCalendarDayDiffer(new Date(), new Date(data.date))) return initialState;

  return data;
}
