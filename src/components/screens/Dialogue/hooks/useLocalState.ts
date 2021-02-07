import {useReducer} from 'react';

import IPayloadAction from '@/models/IPayloadAction';

import ICompleteDialogue from '../models/ICompleteDialogue';

export interface ILocalStateFulfilled {
  status: 'success';
  dialogue: {
    active: ICompleteDialogue;
    introduction: boolean;
    sequence: number;
  };
}
export interface ILocalStateUnfulfilled {
  status: 'loading' | 'error';
}
export type ILocalState = ILocalStateFulfilled | ILocalStateUnfulfilled;

export type Action =
  | IPayloadAction<'setErrorStatus'>
  | IPayloadAction<'setActiveDialogue', ICompleteDialogue>
  | IPayloadAction<'switchIntroduction', boolean>
  | IPayloadAction<'incrementSequence'>;

const defaultState: ILocalState = {
  status: 'loading',
};

function reducer(state: ILocalState, action: Action): ILocalState {
  switch (action.type) {
    case 'setErrorStatus':
      return {
        ...state,
        status: 'error',
      };
    case 'setActiveDialogue':
      return {
        ...state,
        status: 'success',
        dialogue: {
          active: action.payload,
          introduction: true,
          sequence: 0,
        },
      };
    case 'switchIntroduction': {
      if (state.status !== 'success')
        throw new Error(
          "Cannot change introduction state on dialogue object while there isn't any active dialogue (status !== success)."
        );

      return {
        ...state,
        dialogue: {
          ...state.dialogue,
          introduction: action.payload,
        },
      };
    }
    case 'incrementSequence':
      if (state.status !== 'success')
        throw new Error(
          "Cannot increment dialogue sequence while there isn't any active dialogue (status !== success)."
        );

      return {
        ...state,
        dialogue: {
          ...state.dialogue,
          sequence: state.dialogue.sequence + 1,
        },
      };
    default:
      throw new Error(`Unknown action type`);
  }
}

export default function useLocalState() {
  return useReducer(reducer, defaultState);
}
