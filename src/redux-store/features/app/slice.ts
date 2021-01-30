import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState, AppStateStatus} from 'react-native';

import {IChangeStatusError, IChangeStatusReady, IInitialState} from './types';

export const initialState: IInitialState = {
  status: 'loading',
  state: AppState.currentState,
  devMode: false,
};

const appSlice = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    setAppStatus: (state: IInitialState, action: PayloadAction<IChangeStatusReady | IChangeStatusError>) => {
      return {
        ...state,
        ...{status: action.payload.status, error: action.payload.status === 'error' ? action.payload.error : undefined},
      };
    },
    setAppState: (state: IInitialState, action: PayloadAction<AppStateStatus>) => {
      return {...state, ...{appState: action.payload}};
    },
    switchDevMode: (state: IInitialState, action: PayloadAction<boolean>) => {
      return {...state, ...{devMode: action.payload}};
    },
  },
});

export default appSlice;
