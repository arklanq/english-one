import {makeStyles} from '@idkman/react-native-styles';

import {IMAGE_CARD_SPACING} from '@/components/molecules/ImageCard';
import {ITheme, ThemeVariant} from '@/models/theme/ITheme';
import {fontName} from '@/redux-store/features/app/fonts';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.palette.background.default,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  points: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginLeft: IMAGE_CARD_SPACING,
    fontFamily: fontName['BowlbyOneSC-Regular'],
  },
  cardWrapper: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: IMAGE_CARD_SPACING - 8,
  },
  card: {
    ...theme.shadow[4],
  },
  scrollView: {},
  scrollViewContainer: {
    flexGrow: 1,
  },
  activityIndicatorWrapper: {
    marginVertical: 16,
  },
  listSection: {
    marginVertical: 0,
  },
  goldenListItem: () => ({
    backgroundColor: theme.variant === ThemeVariant.LIGHT ? theme.palette.primary.light : theme.palette.primary.dark,
  }),
}));

export default useStyles;
