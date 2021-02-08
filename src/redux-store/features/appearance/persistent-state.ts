import {Appearance} from 'react-native';
import {object, string} from 'yup';

import AsyncStorage from '@/mechanisms/AsyncStorage';
import ErrorReporting from '@/mechanisms/ErrorReporting';
import {validateSync} from '@/utils/yup-utils';

import {IColorSchemeInfo, IInitialState} from './slice';

export type IPersistentState = Pick<IColorSchemeInfo, 'userPreference'>;

export const initialState: IInitialState = {
  colorScheme: {
    system: Appearance.getColorScheme() ?? 'light',
    userPreference: 'automatic',
  },
};
const STORAGE_KEY = 'appearance';
const validation = object()
  .required()
  .shape({
    userPreference: string().required().oneOf(['light', 'dark', 'automatic']),
  });

function transformToPersistentState(state: IInitialState): IPersistentState {
  return {
    userPreference: state.colorScheme.userPreference,
  };
}
function transformToVolaitleState(persistentState: IPersistentState): IInitialState {
  return {
    ...initialState,
    colorScheme: {
      ...initialState.colorScheme,
      ...persistentState,
    },
  };
}

export async function saveState(state: IInitialState): Promise<void> {
  await AsyncStorage.setJsonItem<IPersistentState>(STORAGE_KEY, transformToPersistentState(state));
}

export async function purgeState(): Promise<void> {
  await AsyncStorage.unsetItem(STORAGE_KEY);
}

export async function loadState(): Promise<IInitialState> {
  let data: IInitialState | unknown;
  try {
    data = await AsyncStorage.getJsonItem<IPersistentState | unknown>(STORAGE_KEY);
  } catch (e: unknown) {
    ErrorReporting.captureError(e, 'Encountered unknown error while loading `exercises state` from AsyncStorage.');
    await purgeState();
    return initialState;
  }

  if (data === null) return initialState;

  try {
    validateSync<IPersistentState>(validation, data);
  } catch (e: unknown) {
    ErrorReporting.captureError(e, 'Found corrupted `appearance state` in AsyncStorage.');
    await purgeState();
    return initialState;
  }

  return transformToVolaitleState(data);
}
