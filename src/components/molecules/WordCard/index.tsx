import {makeStyles} from '@idkman/react-native-styles';
import {LinearGradient} from 'expo-linear-gradient';
import React, {memo, useMemo} from 'react';
import {Dimensions, ImageStyle, View} from 'react-native';
import {Card} from 'react-native-paper';

import Typography from '@/components/atoms/Typography';
import gradients from '@/components/molecules/WordCard/gradients';
import {ITheme} from '@/models/theme/ITheme';
import {getRandomInteger} from '@/utils/random-utils';

export interface IWordCardProps {
  question: string;
}

const WINDOW_WIDTH = Dimensions.get('window').width;
export const IMAGE_CARD_SPACING = 24;
export const IMAGE_CARD_WIDTH = WINDOW_WIDTH - 2 * IMAGE_CARD_SPACING;
export const IMAGE_CARD_FULL_WIDTH = IMAGE_CARD_WIDTH + 2 * IMAGE_CARD_SPACING;

const useStyles = makeStyles((theme: ITheme) => ({
  container: {
    width: IMAGE_CARD_WIDTH,
    marginHorizontal: IMAGE_CARD_SPACING,
    overflow: 'visible',
  },
  card: {
    width: '100%',
    marginBottom: 48,
    borderRadius: theme.shape.borderRadius,
    ...theme.shadow[12],
  },
  gradient: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.palette.common.white,
    marginBottom: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
}));

function WordCard(props: IWordCardProps) {
  const {question} = props;
  const stylesheet = useStyles();
  const gradient = useMemo(() => gradients[getRandomInteger(0, gradients.length - 1)], []);

  return (
    <View style={stylesheet.container}>
      <Card style={stylesheet.card}>
        <LinearGradient style={stylesheet.gradient as ImageStyle} {...gradient}>
          <View style={stylesheet.overlay}>
            <Typography variant='h1' style={stylesheet.text}>
              {question}
            </Typography>
          </View>
        </LinearGradient>
      </Card>
    </View>
  );
}

export default memo(WordCard);
