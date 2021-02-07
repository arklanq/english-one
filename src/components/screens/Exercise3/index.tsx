import React, {Dispatch, memo} from 'react';
import {ScrollView, View} from 'react-native';
import {Card, List} from 'react-native-paper';
import {useSelector} from 'react-redux';

import Typography from '@/components/atoms/Typography';
import DailyQuestionsPassed from '@/components/organisms/DailyQuestionsPassed';
import {IScreenNavigationProps} from '@/components/other/Router';
import IDialogueInfo from '@/models/IDialogueInfo';
import {selectExercisePoints, selectExerciseSolvedQuestions} from '@/redux-store/features/exercises/selectors';

import useCongratsInfoDismissHandler from './hooks/useCongratsInfoDismissHandler';
import useFetchDialoguesList from './hooks/useFetchDialoguesList';
import useListItemPressHandler from './hooks/useListItemPressHandler';
import useLocalState, {Action, ILocalState} from './hooks/useLocalState';
import useRenderListItemIconHandler from './hooks/useRenderListItemIconHandler';
import useStyles from './hooks/useStyles';

export interface IExercise3Props extends IScreenNavigationProps<'exercise3'> {}

function Exercise3(props: IExercise3Props) {
  const {navigation} = props;
  const stylesheet = useStyles();
  // redux
  const points = useSelector(selectExercisePoints(3));
  const solvedDialogues = useSelector(selectExerciseSolvedQuestions(3));
  // local-state
  const [state, dispatch]: [ILocalState, Dispatch<Action>] = useLocalState();
  const {status, dialoguesList, userInteraction} = state;
  // handlers
  const dismissCongratsInfo = useCongratsInfoDismissHandler(dispatch);
  const generateRenderListItemIconFn = useRenderListItemIconHandler(solvedDialogues);
  const generateListItemPressHandler = useListItemPressHandler(navigation);
  // controllers
  useFetchDialoguesList(dispatch);
  // calculations;
  const shouldShowCongratsInfo = points >= 10 && !userInteraction.dismissedCongratsScreen;
  const isDialoguesListReady = status === 'idle';

  return (
    <View style={stylesheet.root}>
      {shouldShowCongratsInfo ? (
        <DailyQuestionsPassed navigation={navigation} onDimiss={dismissCongratsInfo} />
      ) : (
        <>
          <Typography style={stylesheet.points} variant='h6'>
            {points.toString()} / 10 punktów
          </Typography>

          <View style={stylesheet.cardWrapper}>
            <Card style={stylesheet.card}>
              <ScrollView style={stylesheet.scrollView} contentContainerStyle={stylesheet.scrollViewContainer}>
                <List.Section style={stylesheet.listSection}>
                  <List.Accordion title='Dostępne dialogi' expanded={isDialoguesListReady}>
                    {dialoguesList.map((dialogue: IDialogueInfo) => (
                      <List.Item
                        key={dialogue.id}
                        title={dialogue.title}
                        right={generateRenderListItemIconFn(dialogue)}
                        onPress={generateListItemPressHandler(dialogue)}
                        style={solvedDialogues.includes(dialogue.id) && stylesheet.goldenListItem}
                      />
                    ))}
                  </List.Accordion>
                </List.Section>
              </ScrollView>
            </Card>
          </View>
        </>
      )}
    </View>
  );
}

export default memo(Exercise3);
