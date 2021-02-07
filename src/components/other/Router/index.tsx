import {makeStyles} from '@idkman/react-native-styles';
import {NavigationContainer, NavigationContainerRef, RouteProp} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions, StackNavigationProp} from '@react-navigation/stack';
import React, {memo, useCallback, useRef} from 'react';

import Dialogue from '@/components/screens/Dialogue';
import Home from '@/components/screens/Home';
import Settings from '@/components/screens/Settings';
import IDialogueInfo from '@/models/IDialogueInfo';
import {ITheme} from '@/models/theme/ITheme';

import useScreenOptions from './hooks/useScreenOptions';
import exercises, {IExerciseRoute} from './misc/exercises';

export type StackParamList = Record<
  'home' | 'settings' | 'exercise1' | 'exercise2' | 'exercise3' | 'exercise4' | 'exercise5',
  undefined
> & {dialogue: {dialogue: IDialogueInfo}};
export interface IScreenNavigationProps<S extends keyof StackParamList> {
  route: RouteProp<StackParamList, S>;
  navigation: StackNavigationProp<StackParamList, S>;
}
export type ScreenNavigationProp<S extends keyof StackParamList> = StackNavigationProp<StackParamList, S>;
export interface INavigateGlobally<N extends keyof StackParamList = keyof StackParamList> {
  (name: N, params?: StackParamList[N]): void;
}

const Stack = createStackNavigator<StackParamList>();

const useStyles = makeStyles((theme: ITheme) => ({
  mainMenuTitle: {
    ...theme.typography.h5,
    fontFamily: 'BowlbyOneSC-Regular',
    color: theme.palette.contrastText.primary,
    top: 6,
  },
}));

function Router() {
  const stylesheet = useStyles();
  const navigationRef = useRef<NavigationContainerRef | null>(null);
  const navigateGlobally = useCallback(
    <N extends keyof StackParamList>(name: N, params?: StackParamList[N]) =>
      navigationRef.current?.navigate(name, params),
    []
  );
  const screenOptions: StackNavigationOptions = useScreenOptions(navigateGlobally);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='home' screenOptions={screenOptions}>
        <Stack.Screen
          key='home'
          name='home'
          component={Home}
          options={{title: 'English One', headerTitleAlign: 'left', headerTitleStyle: stylesheet.mainMenuTitle}}
        />
        <Stack.Screen
          key='settings'
          name='settings'
          component={Settings}
          options={{title: 'Ustawienia', headerRight: undefined}}
        />
        <Stack.Screen
          key='dialogue'
          name='dialogue'
          component={Dialogue}
          options={({route}) => ({title: route.params.dialogue.title})}
        />
        {exercises.map((exercise: IExerciseRoute) => (
          <Stack.Screen
            key={exercise.name}
            name={exercise.name}
            component={exercise.component}
            options={{title: exercise.title}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default memo(Router);
