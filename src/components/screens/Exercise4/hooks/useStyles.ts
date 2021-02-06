import {makeStyles} from '@idkman/react-native-styles';

import {IMAGE_CARD_SPACING} from '@/components/organisms/ImageCard';
import {ITheme} from '@/models/theme/ITheme';
import {fontName} from '@/redux-store/features/app/fonts';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  spinnerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: IMAGE_CARD_SPACING,
    fontFamily: fontName['BowlbyOneSC-Regular'],
  },
}));

export default useStyles;
