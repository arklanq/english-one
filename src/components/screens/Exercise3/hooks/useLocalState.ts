import {useReducer} from 'react';

import IDialogueInfo from '@/models/IDialogueInfo';
import IPayloadAction from '@/models/IPayloadAction';

export interface IUserInteractions {
  dismissedCongratsScreen: boolean;
}
export interface ILocalState {
  status: 'idle' | 'loading' | 'error';
  dialoguesList: IDialogueInfo[];
  userInteraction: IUserInteractions;
}
export type Action =
  | IPayloadAction<'setStatus', 'idle' | 'loading' | 'error'>
  | IPayloadAction<'setDialoguesList', IDialogueInfo[]>
  | IPayloadAction<'updateUserInteractions', Partial<IUserInteractions>>;

const defaultState: ILocalState = {
  dialoguesList: [],
  status: 'loading',
  userInteraction: {
    dismissedCongratsScreen: false,
  },
};

function reducer(state: ILocalState, action: Action): ILocalState {
  switch (action.type) {
    case 'setStatus':
      return {
        ...state,
        status: action.payload,
      };
    case 'setDialoguesList':
      return {
        ...state,
        dialoguesList: action.payload,
        status: 'idle',
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
