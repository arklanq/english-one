import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorSchemeName} from 'react-native';

import {initialState, saveState} from './persistent-state';

export type ColorScheme = Exclude<ColorSchemeName, null | undefined>;

export interface IColorSchemeInfo {
  system: ColorScheme;
  userPreference: ColorScheme | 'automatic';
}

export interface IInitialState {
  colorScheme: IColorSchemeInfo;
}

const appearanceSlice = createSlice({
  name: 'APPEARANCE',
  initialState: initialState as IInitialState, // better ts autocompletation in reducers
  reducers: {
    overrideState: (state: IInitialState, action: PayloadAction<IInitialState>) => action.payload,
    setSystemColorScheme: (state: IInitialState, action: PayloadAction<IColorSchemeInfo['system']>) => {
      const newState: IInitialState = {
        ...state,
        colorScheme: {
          ...state.colorScheme,
          system: action.payload,
        },
      };

      saveState(state);
      return newState;
    },
    setUserPreferredColorScheme: (
      state: IInitialState,
      action: PayloadAction<Exclude<IColorSchemeInfo['userPreference'], undefined>>
    ) => {
      const newState: IInitialState = {
        ...state,
        colorScheme: {
          ...state.colorScheme,
          userPreference: action.payload,
        },
      };

      saveState(newState);
      return newState;
    },
  },
});

export default appearanceSlice;
