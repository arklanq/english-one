import React, {Dispatch, memo} from 'react';
import {View} from 'react-native';

import DialogueIntroduction from '@/components/organisms/DialogueIntroduction';
import DialogueQuestion from '@/components/organisms/DialogueQuestion';
import ScreenBlocker from '@/components/organisms/ScreenBlocker';
import {IScreenNavigationProps} from '@/components/other/Router';
import useFetchDialogue from '@/components/screens/Dialogue/hooks/useFetchDialogue';

import useDimissIntroductionHandler from './hooks/useDimissIntroductionHandler';
import useLocalState, {Action, ILocalState} from './hooks/useLocalState';
import useQuestionProceedHandler from './hooks/useQuestionProceedHandler';
import useStyles from './hooks/useStyles';

export interface IDialogueProps extends IScreenNavigationProps<'dialogue'> {}

function Dialogue(props: IDialogueProps) {
  const {route, navigation} = props;
  const {params} = route;
  const stylesheet = useStyles();
  // local-state
  const [state, dispatch]: [ILocalState, Dispatch<Action>] = useLocalState();
  // handlers
  const handleDismissIntroduction = useDimissIntroductionHandler(dispatch);
  const handleQuestionProceed = useQuestionProceedHandler(state, dispatch, navigation);
  // controllers
  useFetchDialogue(params.dialogue.id, dispatch);

  return (
    <View style={stylesheet.root}>
      {state.status !== 'success' ? (
        <ScreenBlocker />
      ) : state.dialogue.introduction ? (
        <DialogueIntroduction dialogue={state.dialogue.active} onDismiss={handleDismissIntroduction} />
      ) : (
        <DialogueQuestion
          question={state.dialogue.active.questions[state.dialogue.sequence]}
          proceed={handleQuestionProceed}
        />
      )}
    </View>
  );
}

export default memo(Dialogue);
