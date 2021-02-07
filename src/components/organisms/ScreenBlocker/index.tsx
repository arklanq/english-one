import {makeStyles, useTheme} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function ScreenBlocker() {
  const stylesheet = useStyles();
  const theme: ITheme = useTheme();

  return (
    <View style={stylesheet.root}>
      <ActivityIndicator animating color={theme.palette.secondary.main} size='large' />
    </View>
  );
}

export default memo(ScreenBlocker);
