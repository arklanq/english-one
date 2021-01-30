import {SerializedError} from '@reduxjs/toolkit';
import {AppStateStatus} from 'react-native';

export interface IInitialState {
  status: 'loading' | 'ready' | 'error';
  state: AppStateStatus;
  devMode: boolean;
  error?: SerializedError;
}

export interface IChangeStatusReady {
  status: 'ready';
}

export interface IChangeStatusError {
  status: 'error';
  error: SerializedError;
}
