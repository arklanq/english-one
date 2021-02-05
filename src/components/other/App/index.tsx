import {StylesProvider} from '@idkman/react-native-styles';
import {WebSQLDatabase} from 'expo-sqlite';
import React, {memo} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';
import {useSelector} from 'react-redux';

import useBootstrapApp from '@/components/other/App/hooks/useBootstrapApp';
import Main from '@/components/other/Main';
import {SQLiteProvider} from '@/contexts/SQLiteContext';
import {getDB} from '@/database/accessor';
import IExpoProps from '@/models/ExpoProps';
import {ITheme} from '@/models/theme/ITheme';
import {selectIsAppReady} from '@/redux-store/features/app/selectors';

import useAppearanceController from './hooks/useAppearanceController';
import useAppStateController from './hooks/useAppStateController';
import useNetworkInfoController from './hooks/useNetworkInfoController';
import usePaperThemePicker from './hooks/usePaperThemePicker';
import useThemePicker from './hooks/useThemePicker';

export interface IAppProps {
  exp: IExpoProps;
}

function App(_props: IAppProps) {
  const isAppReady: boolean = useSelector(selectIsAppReady);
  const theme: ITheme = useThemePicker();
  const paperTheme: PaperTheme = usePaperThemePicker(theme);
  const database: WebSQLDatabase | null = getDB();

  useAppStateController();
  useNetworkInfoController();
  useAppearanceController();
  useBootstrapApp();

  if (isAppReady && database) {
    return (
      <StylesProvider<ITheme> theme={theme}>
        <PaperProvider theme={paperTheme}>
          <SQLiteProvider database={database}>
            <Main />
          </SQLiteProvider>
        </PaperProvider>
      </StylesProvider>
    );
  } else return null;
}

export default memo(App);
