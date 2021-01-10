import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance, ColorSchemeName} from 'react-native';

export type ColorScheme = Exclude<ColorSchemeName, null | undefined>;

export interface IColorSchemeInfo {
  system: ColorScheme;
  userPreference?: ColorScheme | 'automatic';
}

export interface IInitialState {
  colorScheme: IColorSchemeInfo;
}

export const initialState: IInitialState = {
  colorScheme: {
    system: Appearance.getColorScheme() ?? 'light',
  },
};

const appearanceSlice = createSlice({
  name: 'APPEARANCE',
  initialState,
  reducers: {
    setSystemColorScheme: (state: IInitialState, action: PayloadAction<IColorSchemeInfo['system']>) => ({
      ...state,
      systemColorScheme: action.payload,
    }),
    setUserPreferredColorScheme: (
      state: IInitialState,
      action: PayloadAction<Exclude<IColorSchemeInfo['userPreference'], undefined>>
    ) => ({
      ...state,
      userPreferredColorScheme: action.payload,
    }),
  },
});

export default appearanceSlice;
