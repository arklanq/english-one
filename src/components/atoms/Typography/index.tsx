import {makeStyles} from '@idkman/react-native-styles';
import React, {memo} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

import {ITheme} from '@/models/theme/ITheme';
import {TypographyVariant} from '@/models/theme/IThemeTypography';

export interface ITypographyProps extends TextProps {
  variant?: TypographyVariant;
  children: string | string[];
}

type ITypographyStylesObject = Record<TypographyVariant, TextStyle>;

const useStyles = makeStyles(
  (theme: ITheme) =>
    (Object.keys(theme.typography) as TypographyVariant[]).reduce(
      (styles: Partial<ITypographyStylesObject>, variant: TypographyVariant) => {
        styles[variant] = theme.typography[variant];
        return styles;
      },
      {}
    ) as ITypographyStylesObject
);

function Typography(props: ITypographyProps) {
  const {variant = 'body1', style, ...TextProps} = props;
  const stylesheet = useStyles();

  return <Text style={[stylesheet[variant], style]} {...TextProps} />;
}

export default memo(Typography);
