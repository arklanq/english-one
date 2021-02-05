import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';

export type DatabaseAvailabilityStatus = 'loading' | 'available' | 'updating';

export interface IAvailableState {
  status: Exclude<DatabaseAvailabilityStatus, 'loading'>;
  version: number;
}
export interface IUnavailableState {
  status: Extract<DatabaseAvailabilityStatus, 'loading'>;
}
export type IInitialState = IAvailableState | IUnavailableState;

export const initialState: IInitialState = {
  status: 'loading',
};

const databaseSlice = createSlice({
  name: 'DATABASE',
  initialState: initialState as IInitialState, // better ts autocompletation in reducers
  reducers: {
    setVersion: (state: Draft<IInitialState>, action: PayloadAction<number>) =>
      ({
        status: 'available',
        version: action.payload,
      } as IAvailableState),
  },
});

export default databaseSlice;
