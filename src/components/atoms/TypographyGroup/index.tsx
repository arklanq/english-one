import {makeStyles} from '@idkman/react-native-styles';
import React, {memo, ReactElement} from 'react';
import {Text, TextStyle} from 'react-native';

import {ITypographyProps} from '@/components/atoms/Typography';

export interface ITypographyGroupProps {
  children: ReactElement<ITypographyProps> | ReactElement<ITypographyProps>[];
  align?: TextStyle['textAlign'];
  style?: TextStyle;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

function TypographyGroup(props: ITypographyGroupProps) {
  const {children, align, style} = props;
  const stylesheet = useStyles();

  return <Text style={[stylesheet.root, align && {textAlign: align}, style]}>{children}</Text>;
}

export default memo(TypographyGroup);
