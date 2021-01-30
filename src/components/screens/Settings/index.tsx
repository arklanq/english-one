import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {View} from 'react-native';

import Typography from '@/components/atoms/Typography';
import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Settings() {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Typography variant='h3'>Settings</Typography>
    </View>
  );
}

export default memo(Settings);
