import {makeStyles} from '@idkman/react-native-styles';
import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Button, Card} from 'react-native-paper';

import Typography from '@/components/atoms/Typography';
import TypographyGroup from '@/components/atoms/TypographyGroup';
import {ScreenNavigationProp} from '@/components/other/Router';
import {ITheme} from '@/models/theme/ITheme';

export interface IQuestionsPoolExhaustedProps {
  navigation: ScreenNavigationProp<'exercise2'>;
}

const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    marginHorizontal: 24,
    marginVertical: 'auto',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    ...theme.shadow[4],
  },
  content: {
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: -8,
  },
  startIcon: {
    margin: 0,
  },
  title: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    marginVertical: 16,
  },
  button: {
    width: '100%',
    margin: 'auto',
    alignSelf: 'center',
    maxWidth: 200,
    marginBottom: 8,
  },
  primaryButton: {
    maxWidth: 250,
  },
  button_label: {
    color: theme.palette.primary.contrastText,
  },
}));

function QuestionsPoolExhausted(props: IQuestionsPoolExhaustedProps) {
  const {navigation} = props;
  const stylesheet = useStyles();

  const handleBackButtonPress = useCallback(() => {
    navigation.navigate('home');
  }, [navigation]);

  return (
    <View style={stylesheet.root}>
      <Card.Content style={stylesheet.content}>
        <View style={stylesheet.title}>
          <Typography variant='h3' style={{marginBottom: 0}}>
            And.. it's over 😔
          </Typography>
        </View>

        <TypographyGroup align='center' style={stylesheet.group}>
          <Typography variant='body1'>
            To już wszystkie zadania, jakie mieliśmy przygotowane dla Ciebie na dzisiaj. Zajrzyj do aplikacji jutro.
          </Typography>
        </TypographyGroup>

        <View style={stylesheet.group}>
          <Button
            mode='contained'
            style={[stylesheet.button, stylesheet.primaryButton]}
            labelStyle={stylesheet.button_label}
            onPress={handleBackButtonPress}
          >
            Wróć
          </Button>
        </View>
      </Card.Content>
    </View>
  );
}

export default memo(QuestionsPoolExhausted);
