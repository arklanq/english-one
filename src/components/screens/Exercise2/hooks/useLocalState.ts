import {useReducer} from 'react';

import IPayloadAction from '@/models/IPayloadAction';

import ISimpleQuestion from '../models/ISimpleQuestion';

export interface IUserInteractions {
  dismissedCongratsScreen: boolean;
}
export interface ILocalState {
  questions: ISimpleQuestion[];
  activeQuestionIndex: number;
  endReached: boolean;
  poolExhausted: boolean;
  userInteraction: IUserInteractions;
}
export type Action =
  | IPayloadAction<'setActiveQuestionIndex', number>
  | IPayloadAction<'setEndReached', boolean>
  | IPayloadAction<'setPoolExhausted', boolean>
  | IPayloadAction<'pushNewQuestions', ISimpleQuestion[]>
  | IPayloadAction<'updateUserInteractions', Partial<IUserInteractions>>;

const defaultState: ILocalState = {
  questions: [],
  activeQuestionIndex: 0,
  endReached: true,
  poolExhausted: false,
  userInteraction: {
    dismissedCongratsScreen: false,
  },
};

function reducer(state: ILocalState, action: Action): ILocalState {
  switch (action.type) {
    case 'setActiveQuestionIndex':
      return {
        ...state,
        activeQuestionIndex: action.payload,
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
    case 'pushNewQuestions':
      return {
        ...state,
        questions: state.questions.slice().concat(action.payload),
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
