import {NetInfoStateType} from '@react-native-community/netinfo/src/internal/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorSchemeName} from 'react-native';

export type ColorScheme = Exclude<ColorSchemeName, null | undefined>;

export interface INetworkInfo {
  type: NetInfoStateType;
  isConnected: boolean;
  isReachable: boolean;
}

export type IInitialState = INetworkInfo | object;

export const initialState: IInitialState = {};

const networkSlice = createSlice({
  name: 'APPEARANCE',
  initialState,
  reducers: {
    updateNetworkInfo: (state: IInitialState, action: PayloadAction<INetworkInfo>) => action.payload,
  },
});

export default networkSlice;
