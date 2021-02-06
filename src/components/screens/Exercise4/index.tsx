import {useTheme} from '@idkman/react-native-styles';
import {FormikProps} from 'formik';
import React, {Dispatch, memo, useMemo, useRef} from 'react';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Typography from '@/components/atoms/Typography';
import {IAnswerValues} from '@/components/organisms/SimpleAnswerForm';
import {ScreenNavigationProp} from '@/components/other/Router';
import IQuestion from '@/models/IQuestion';
import {ITheme} from '@/models/theme/ITheme';
import {selectExercisePoints} from '@/redux-store/features/exercises/selectors';
import {DispatchType} from '@/redux-store/models';

import useStyles from './hooks/useStyles';
import ITranslateWordTask from './models/ITranslateWordTask';

export interface IExercise4Props {
  navigation: ScreenNavigationProp<'exercise2'>;
}

function Exercise4(props: IExercise4Props) {
  /*const {navigation} = props;
  const stylesheet = useStyles();
  const theme: ITheme = useTheme();
  // refs
  const carouselRef = useRef<FlatList<IQuestion> | null>(null);
  const formikRef = useRef<FormikProps<IAnswerValues> | null>(null);
  // redux
  const points = useSelector(selectExercisePoints(4));
  const reduxDispatch: DispatchType = useDispatch();
  // local-state
  const [state, dispatch]: [ILocalState, Dispatch<Action>] = useLocalState();
  const {tasks, activeTaskIndex, poolExhausted, userInteraction} = state;
  const questions: IQuestion[] = useMemo(() => tasks.map((tasks: ITranslateWordTask) => tasks.question), [tasks]);*/

  return (
    <View>
      <Typography variant='h3'>Exercise4</Typography>
    </View>
  );
}

export default memo(Exercise4);
