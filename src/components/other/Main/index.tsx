import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {View} from 'react-native';

import AppStatusBar from '@/components/atoms/AppStatusBar';
import Router from '@/components/other/Router';
import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  main: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

function Main() {
  const stylesheet = useStyles();

  return (
    <View style={stylesheet.main}>
      <AppStatusBar />
      <Router />
    </View>
  );
}

export default memo(Main);
