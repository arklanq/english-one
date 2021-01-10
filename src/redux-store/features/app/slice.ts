import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppState, AppStateStatus} from 'react-native';

export interface IInitialState {
  ready: boolean;
  state: AppStateStatus;
  devMode: boolean;
}

export const initialState: IInitialState = {
  ready: false,
  state: AppState.currentState,
  devMode: false,
};

const appSlice = createSlice({
  name: 'APP',
  initialState,
  reducers: {
    setAppReady: (state: IInitialState, action: PayloadAction<boolean>) => {
      return {...state, ...{appReady: action.payload}};
    },
    setAppState: (state: IInitialState, action: PayloadAction<AppStateStatus>) => {
      return {...state, ...{appState: action.payload}};
    },
    activateDevMode: (state: IInitialState, _action: Action) => {
      return {...state, ...{devMode: true}};
    },
  },
});

export default appSlice;
