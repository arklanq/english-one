import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {View} from 'react-native';
import {Button, Card, List} from 'react-native-paper';

import IDialogue from '@/models/IDialogue';
import {ITheme} from '@/models/theme/ITheme';

export interface IDialogueIntroductionProps {
  dialogue: IDialogue;
  onDismiss: () => unknown;
}

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    flexGrow: 0,
    ...theme.shadow[4],
    marginBottom: 64,
    minHeight: 150,
  },
  button: {
    width: '100%',
    maxWidth: 250,
    alignSelf: 'center',
  },
  button__label: {
    color: theme.palette.primary.contrastText,
  },
}));

function DialogueIntroduction(props: IDialogueIntroductionProps) {
  const {dialogue, onDismiss} = props;
  const stylesheet = useStyles();

  return (
    <View style={stylesheet.root}>
      <Card style={stylesheet.card}>
        <List.Item
          title='Wstęp do dialogu'
          description={dialogue.introduction}
          descriptionNumberOfLines={0}
          left={(props) => <List.Icon {...props} icon='information-outline' />}
        />
      </Card>

      <Button mode='contained' style={stylesheet.button} labelStyle={stylesheet.button__label} onPress={onDismiss}>
        Rozpocznij
      </Button>
    </View>
  );
}

export default memo(DialogueIntroduction);
