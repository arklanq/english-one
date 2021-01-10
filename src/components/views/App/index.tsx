import {StatusBar} from 'expo-status-bar';
import React, {memo, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {StylesProvider} from 'react-native-styles';
import {useDispatch, useSelector} from 'react-redux';

import useAppStateController from '@/components/views/App/useAppStateController';
import useNetworkInfoController from '@/components/views/App/useNetworkInfoController';
import useThemePicker from '@/components/views/App/useThemePicker';
import IExpoProps from '@/models/ExpoProps';
import {ITheme} from '@/models/theme/ITheme';
import {bootstrapAppAction} from '@/redux-store/actions/bootstrapAppAction';
import {selectIsAppReady} from '@/redux-store/features/app/selectors';
import {DispatchType} from '@/redux-store/types';

export interface IAppProps {
  exp: IExpoProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App(_props: IAppProps) {
  const dispatch: DispatchType = useDispatch();
  const isAppReady: boolean = useSelector(selectIsAppReady);
  const theme: ITheme | null = useThemePicker();

  useAppStateController();
  useNetworkInfoController();

  useEffect(() => {
    dispatch(bootstrapAppAction());
  }, [dispatch]);

  if (isAppReady && theme) {
    return (
      <StylesProvider<ITheme> theme={theme}>
        <PaperProvider>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style='auto' />
          </View>
        </PaperProvider>
      </StylesProvider>
    );
  } else return null;
}

export default memo(App);
