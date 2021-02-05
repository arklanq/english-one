import {makeStyles, useTheme} from '@idkman/react-native-styles';
import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {Button, Card, IconButton} from 'react-native-paper';

import Typography from '@/components/atoms/Typography';
import TypographyGroup from '@/components/atoms/TypographyGroup';
import {ScreenNavigationProp} from '@/components/other/Router';
import {ITheme} from '@/models/theme/ITheme';

export interface IDailyQuestionsPassedProps {
  navigation: ScreenNavigationProp<'exercise2'>;
  onDimiss: () => unknown;
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

function DailyQuestionsPassed(props: IDailyQuestionsPassedProps) {
  const {navigation, onDimiss} = props;
  const theme: ITheme = useTheme();
  const stylesheet = useStyles();

  const handleBackButtonPress = useCallback(() => {
    navigation.navigate('home');
  }, [navigation]);

  return (
    <View style={stylesheet.root}>
      <Card.Content style={stylesheet.content}>
        <View style={stylesheet.title}>
          <IconButton icon='star' size={36} color={theme.palette.primary.main} style={stylesheet.startIcon} />
          <Typography variant='h3' style={{marginBottom: 0}}>
            Congratulations!
          </Typography>
          <IconButton icon='star' size={36} color={theme.palette.primary.main} style={stylesheet.startIcon} />
        </View>

        <TypographyGroup align='center' style={stylesheet.group}>
          <Typography variant='body1'>
            Wykonałeś wszystkie codzienne pytania w tej kategorii, zbierając przy tym{' '}
          </Typography>
          <Typography variant='body1' bold>
            10 punktów
          </Typography>
          <Typography variant='body1'>.</Typography>
        </TypographyGroup>

        <View style={stylesheet.group}>
          <Button
            mode='contained'
            style={[stylesheet.button, stylesheet.primaryButton]}
            labelStyle={stylesheet.button_label}
            onPress={onDimiss}
          >
            Rozwiązuję dalej
          </Button>
          <Button style={stylesheet.button} onPress={handleBackButtonPress}>
            Wróć
          </Button>
        </View>
      </Card.Content>
    </View>
  );
}

export default memo(DailyQuestionsPassed);
