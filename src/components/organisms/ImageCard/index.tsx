import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {Dimensions, ImageStyle, View} from 'react-native';
import {Card} from 'react-native-paper';

export interface IImageCardProps {
  imgURL: string;
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const ELEMENT_WIDTH_MULTIPLIER = 0.8;
export const IMAGE_CARD_WIDTH = WINDOW_WIDTH * ELEMENT_WIDTH_MULTIPLIER;
export const IMAGE_CARD_SPACING = (WINDOW_WIDTH * (1 - ELEMENT_WIDTH_MULTIPLIER)) / 2;
export const IMAGE_CARD_FULL_WIDTH = IMAGE_CARD_WIDTH + 2 * IMAGE_CARD_SPACING;

const useStyles = makeStyles(() => ({
  container: {
    width: IMAGE_CARD_WIDTH,
    marginHorizontal: IMAGE_CARD_SPACING,
  },
  card: {
    width: '100%',
    marginBottom: 48,
  },
  cover: {
    width: '100%',
  },
}));

function ImageCard(props: IImageCardProps) {
  const {imgURL} = props;
  const stylesheet = useStyles();

  return (
    <View style={stylesheet.container}>
      <Card style={stylesheet.card}>
        <Card.Cover source={{uri: imgURL}} resizeMode='contain' style={stylesheet.cover as ImageStyle} />
      </Card>
    </View>
  );
}

export default memo(ImageCard);
