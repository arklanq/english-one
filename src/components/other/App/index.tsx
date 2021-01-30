import {StylesProvider} from '@idkman/react-native-styles';
import React, {memo, useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';
import {useDispatch, useSelector} from 'react-redux';

import AppStatusBar from '@/components/atoms/AppStatusBar';
import useAppearanceController from '@/components/other/App/useAppearanceController';
import useAppStateController from '@/components/other/App/useAppStateController';
import useNetworkInfoController from '@/components/other/App/useNetworkInfoController';
import usePaperThemePicker from '@/components/other/App/usePaperThemePicker';
import useThemePicker from '@/components/other/App/useThemePicker';
import Router from '@/components/other/Router';
import IExpoProps from '@/models/ExpoProps';
import {ITheme} from '@/models/theme/ITheme';
import {bootstrapAppAction} from '@/redux-store/actions/bootstrapAppAction';
import {selectIsAppReady} from '@/redux-store/features/app/selectors';
import {DispatchType} from '@/redux-store/types';

export interface IAppProps {
  exp: IExpoProps;
}

function App(_props: IAppProps) {
  const dispatch: DispatchType = useDispatch();
  const isAppReady: boolean = useSelector(selectIsAppReady);
  const theme: ITheme = useThemePicker();
  const paperTheme: PaperTheme = usePaperThemePicker(theme);

  useAppStateController();
  useNetworkInfoController();
  useAppearanceController();

  useEffect(() => {
    dispatch(bootstrapAppAction());
  }, [dispatch]);

  if (isAppReady) {
    return (
      <StylesProvider<ITheme> theme={theme}>
        <PaperProvider theme={paperTheme}>
          <AppStatusBar />
          <Router />
        </PaperProvider>
      </StylesProvider>
    );
  } else return null;
}

export default memo(App);
