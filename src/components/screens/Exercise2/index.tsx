import {makeStyles, useTheme} from '@idkman/react-native-styles';
import {FormikProps} from 'formik';
import React, {Dispatch, memo, useMemo, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import Typography from '@/components/atoms/Typography';
import DailyQuestionsPassed from '@/components/organisms/DailyQuestionsPassed';
import {IMAGE_CARD_SPACING} from '@/components/organisms/ImageCard';
import ImagesCarousel from '@/components/organisms/ImagesCarousel';
import QuestionsPoolExhausted from '@/components/organisms/QuestionsPoolExhausted';
import SimpleAnswerForm, {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';
import {ScreenNavigationProp} from '@/components/other/Router';
import IImage from '@/models/IImage';
import {ITheme} from '@/models/theme/ITheme';
import {fontName} from '@/redux-store/features/app/fonts';
import {selectExercisePoints} from '@/redux-store/features/exercises/selectors';
import {DispatchType} from '@/redux-store/models';

import useActiveQuestionIndexController from './hooks/useActiveQuestionIndexController';
import useCarouselEndReachHandler from './hooks/useCarouselEndReachHandler';
import useCongratsInfoDismissHandler from './hooks/useCongratsInfoDismissHandler';
import useLocalState, {Action, ILocalState} from './hooks/useLocalState';
import useQuestionSkipHandler from './hooks/useQuestionSkipHandler';
import useQuestionsPopulator from './hooks/useQuestionsPopulator';
import useSubmitHandler from './hooks/useSubmitHandler';
import ISimpleQuestion from './models/ISimpleQuestion';

export interface IExercise2Props {
  navigation: ScreenNavigationProp<'exercise2'>;
}

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

function Exercise2(props: IExercise2Props) {
  const {navigation} = props;
  const stylesheet = useStyles();
  const theme: ITheme = useTheme();
  // refs
  const carouselRef = useRef<FlatList<IImage> | null>(null);
  const formikRef = useRef<FormikProps<IAnswerValues> | null>(null);
  // redux
  const points = useSelector(selectExercisePoints(2));
  const reduxDispatch: DispatchType = useDispatch();
  // local-state
  const [state, dispatch]: [ILocalState, Dispatch<Action>] = useLocalState();
  const {questions, activeQuestionIndex, poolExhausted, userInteraction} = state;
  const images: IImage[] = useMemo(() => questions.map((question: ISimpleQuestion) => question.image), [questions]);
  // handlers
  const handleSkipQuestion = useQuestionSkipHandler(state, dispatch, formikRef, points);
  const handleSubmitAnswer = useSubmitHandler(state, reduxDispatch, points, handleSkipQuestion);
  const handleCarouselEndReach = useCarouselEndReachHandler(dispatch);
  const handleDismissCongratsInfo = useCongratsInfoDismissHandler(dispatch);
  // controllers
  useQuestionsPopulator(state, dispatch);
  useActiveQuestionIndexController(activeQuestionIndex, carouselRef);
  // calculations
  const shouldShowCongratsInfo = points === 10 && !userInteraction.dismissedCongratsScreen;
  const shouldShowThatsAllInfo = poolExhausted && activeQuestionIndex === questions.length;
  const shouldShowSpinner = questions.length === 0;

  return (
    <View style={stylesheet.root}>
      {shouldShowCongratsInfo ? (
        <DailyQuestionsPassed navigation={navigation} onDimiss={handleDismissCongratsInfo} />
      ) : shouldShowThatsAllInfo ? (
        <QuestionsPoolExhausted navigation={navigation} />
      ) : shouldShowSpinner ? (
        <View style={stylesheet.spinnerWrapper}>
          <ActivityIndicator animating color={theme.palette.secondary.main} size='large' />
        </View>
      ) : (
        <>
          <Typography style={stylesheet.title} variant='h6'>
            {points.toString()} / 10 punktów
          </Typography>
          <ImagesCarousel
            ref={carouselRef}
            images={images}
            onEndReached={handleCarouselEndReach}
            activeQuestionIndex={activeQuestionIndex}
          />
          <SimpleAnswerForm ref={formikRef} handleSkip={handleSkipQuestion} handleSubmit={handleSubmitAnswer} />
        </>
      )}
    </View>
  );
}

export default memo(Exercise2);
