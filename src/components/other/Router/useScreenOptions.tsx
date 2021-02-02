import {makeStyles, useTheme} from '@idkman/react-native-styles';
import {StackNavigationOptions, TransitionPresets} from '@react-navigation/stack';
import React from 'react';

import SettingsIcon from '@/components/atoms/SettingsIcon';
import {ITheme} from '@/models/theme/ITheme';

import {INavigateGlobally} from './';

const useStyles = makeStyles((theme: ITheme) => ({
  title: {
    ...theme.typography.h6,
    color: theme.palette.contrastText.primary,
    top: 6,
  },
}));

export default function useScreenOptions(navigateGlobally: INavigateGlobally): StackNavigationOptions {
  const theme: ITheme = useTheme();
  const stylesheet = useStyles();

  return {
    headerStyle: {
      backgroundColor: theme.palette.misc.headerColor,
    },
    headerStatusBarHeight: 0,
    headerPressColorAndroid: theme.palette.misc.barColor,
    headerTintColor: theme.palette.contrastText.icon,
    headerTitleStyle: stylesheet.title,
    headerTitleAlign: 'center',
    headerRight: () => (
      <SettingsIcon
        navigateGlobally={navigateGlobally}
        color={theme.palette.contrastText.icon}
        tintColor={theme.palette.misc.tint}
      />
    ),
    ...TransitionPresets.SlideFromRightIOS,
    gestureDirection: 'horizontal',
  };
}
