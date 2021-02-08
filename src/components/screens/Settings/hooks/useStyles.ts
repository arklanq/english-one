import {makeStyles} from '@idkman/react-native-styles';

import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    padding: 12,
    justifyContent: 'space-between',
  },
  tilesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  art: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
}));

export default useStyles;
