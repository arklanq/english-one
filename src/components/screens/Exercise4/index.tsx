import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {View} from 'react-native';

import Typography from '@/components/atoms/Typography';
import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

function Exercise4() {
  const stylesheet = useStyles();

  return (
    <View style={stylesheet.container}>
      <Typography variant='h3'>Exercise4</Typography>
    </View>
  );
}

export default memo(Exercise4);
