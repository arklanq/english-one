import {makeStyles, useTheme} from '@idkman/react-native-styles';
import React, {memo, ReactNode} from 'react';
import {Dimensions, Pressable, TextStyle, View} from 'react-native';

import Typography from '@/components/atoms/Typography';
import {ITheme, ThemeVariant} from '@/models/theme/ITheme';

export interface ICardIconProps {
  size: number;
  color: string;
  style: TextStyle;
}
export interface ISquereCardProps {
  title: string;
  content: string;
  icon?: (props: ICardIconProps) => ReactNode;
  size?: number;
  onPress?: () => unknown;
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const DEFAULT_CARD_SIZE = WINDOW_WIDTH / 2 - 2 * 12 - 12;

const useStyles = makeStyles((theme: ITheme) => ({
  root: ({size}: ISquereCardProps) => ({
    flex: 1,
    margin: 12,
    width: size ?? DEFAULT_CARD_SIZE,
    maxWidth: size ?? DEFAULT_CARD_SIZE,
    height: size ?? DEFAULT_CARD_SIZE,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    ...theme.shadow[4],
    padding: 8,
    justifyContent: 'space-between',
  }),
  cardHeader: ({size}: ISquereCardProps) => ({
    alignSelf: 'center',
    maxWidth: (size ?? DEFAULT_CARD_SIZE) * (2 / 3),
  }),
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    alignSelf: 'center',
  },
}));

function SquereCard(props: ISquereCardProps) {
  const {title, content, icon, onPress} = props;
  const theme: ITheme = useTheme();
  const stylesheet = useStyles(props);
  const iconColor = theme.variant === ThemeVariant.LIGHT ? theme.palette.grey[700] : theme.palette.grey[300];

  return (
    <Pressable android_ripple={{color: theme.palette.primary.light}} style={stylesheet.root} onPress={onPress}>
      <Typography variant='subtitle2' align='center' style={stylesheet.cardHeader} numberOfLines={2}>
        {title}
      </Typography>
      <View style={stylesheet.cardContent}>
        <Typography variant='h2' align='center' gutterBottom={false} numberOfLines={1}>
          {content}
        </Typography>
      </View>
      {icon?.({size: 24, color: iconColor, style: stylesheet.cardIcon})}
    </Pressable>
  );
}

export default memo(SquereCard);
