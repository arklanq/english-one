import {useReducer} from 'react';

import IPayloadAction from '@/models/IPayloadAction';

import ITranslateWordTask from '../models/ITranslateWordTask';

export interface IUserInteractions {
  dismissedCongratsScreen: boolean;
}
export interface ILocalState {
  tasks: ITranslateWordTask[];
  activeTaskIndex: number;
  skippedTasks: number[];
  endReached: boolean;
  poolExhausted: boolean;
  userInteraction: IUserInteractions;
}
export type Action =
  | IPayloadAction<'skipTask', {index: number; skippedTaskId: number}>
  | IPayloadAction<'submitTask', {index: number}>
  | IPayloadAction<'setEndReached', boolean>
  | IPayloadAction<'setPoolExhausted', boolean>
  | IPayloadAction<'pushNewTasks', ITranslateWordTask[]>
  | IPayloadAction<'updateUserInteractions', Partial<IUserInteractions>>;

const defaultState: ILocalState = {
  tasks: [],
  activeTaskIndex: 0,
  skippedTasks: [],
  endReached: true,
  poolExhausted: false,
  userInteraction: {
    dismissedCongratsScreen: false,
  },
};

function reducer(state: ILocalState, action: Action): ILocalState {
  switch (action.type) {
    case 'skipTask':
      return {
        ...state,
        activeTaskIndex: action.payload.index + 1,
        skippedTasks: [...state.skippedTasks, action.payload.skippedTaskId],
      };
    case 'submitTask':
      return {
        ...state,
        activeTaskIndex: action.payload.index + 1,
      };
    case 'setEndReached':
      return {
        ...state,
        endReached: action.payload,
      };
    case 'setPoolExhausted':
      return {
        ...state,
        poolExhausted: action.payload,
      };
    case 'pushNewTasks':
      return {
        ...state,
        tasks: state.tasks.slice().concat(action.payload),
        endReached: false,
      };
    case 'updateUserInteractions':
      return {
        ...state,
        userInteraction: {
          ...state.userInteraction,
          ...action.payload,
        },
      };
    default:
      throw new Error(`Unknown action type`);
  }
}

export default function useLocalState() {
  return useReducer(reducer, defaultState);
}
