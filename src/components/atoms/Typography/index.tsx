import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

import {ITheme} from '@/models/theme/ITheme';
import {TypographyVariant} from '@/models/theme/IThemeTypography';

export interface ITypographyProps extends TextProps {
  variant?: TypographyVariant;
  bold?: boolean;
  align?: TextStyle['textAlign'];
  children: string | string[];
}

type ITypographyStylesObject = Record<TypographyVariant, TextStyle>;

const useStyles = makeStyles((theme: ITheme) => ({
  ...((Object.keys(theme.typography) as TypographyVariant[]).reduce(
    (styles: Partial<ITypographyStylesObject>, variant: TypographyVariant) => {
      styles[variant] = theme.typography[variant];
      return styles;
    },
    {}
  ) as ITypographyStylesObject),
  bold: {
    fontWeight: 'bold',
  },
}));

function Typography(props: ITypographyProps) {
  const {variant = 'body1', bold, align, style, ...TextProps} = props;
  const stylesheet = useStyles();

  return (
    <Text style={[stylesheet[variant], bold && stylesheet.bold, align && {textAlign: align}, style]} {...TextProps} />
  );
}

export default memo(Typography);
