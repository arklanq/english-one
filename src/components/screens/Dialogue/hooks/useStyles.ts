import {makeStyles} from '@idkman/react-native-styles';

import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    justifyContent: 'flex-start',
    paddingVertical: 24,
  },
}));

export default useStyles;
