import {makeStyles} from '@idkman/react-native-styles';

import {ITheme, ThemeVariant} from '@/models/theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  questionView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  avatar: {
    backgroundColor: theme.variant === ThemeVariant.LIGHT ? theme.palette.grey[500] : theme.palette.grey[700],
    marginVertical: 12,
    marginRight: 12,
  },
  questionCard: {
    flexGrow: 1,
    flexShrink: 0,
    maxWidth: '70%',
    ...theme.shadow[4],
  },
  answersView: {
    alignItems: 'stretch',
    maxWidth: '90%',
    marginLeft: 'auto',
  },
  answerView: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  answerCard: {},
  answerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
  },
  submitFormView: {
    alignItems: 'flex-end',
  },
  generalErrorHelperWrapper: {
    height: 20,
  },
  errorHelper: {
    color: theme.palette.error.main,
    marginTop: 8,
    marginBottom: 0,
    marginHorizontal: 4,
  },
  submitButton: {
    marginVertical: 0,
  },
}));

export default useStyles;
