import {makeStyles, useTheme} from '@idkman/react-native-styles';
import Constants from 'expo-constants';
import {StatusBar} from 'expo-status-bar';
import React, {memo} from 'react';
import {View} from 'react-native';

import {ITheme, ThemeVariant} from '@/models/theme/ITheme';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const useStyles = makeStyles((theme: ITheme) => ({
  spacer: {
    width: '100%',
    height: STATUS_BAR_HEIGHT,
    backgroundColor: theme.palette.misc.barColor,
  },
}));

function AppStatusBar() {
  const stylesheet = useStyles();
  const theme: ITheme = useTheme();

  return (
    <>
      <StatusBar style={theme.variant === ThemeVariant.LIGHT ? 'light' : 'dark'} translucent animated />
      <View style={stylesheet.spacer} />
    </>
  );
}

export default memo(AppStatusBar);
