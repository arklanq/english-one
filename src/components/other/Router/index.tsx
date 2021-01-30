import {NavigationContainer, NavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import React, {memo, useCallback, useRef} from 'react';

import Home from '@/components/screens/Home';
import Settings from '@/components/screens/Settings';

import useScreenOptions from './useScreenOptions';

export type StackParamList = {
  home: undefined;
  settings: undefined;
};
export interface INavigateGlobally<N extends keyof StackParamList = keyof StackParamList> {
  (name: N, params?: StackParamList[N]): void;
}

const Stack = createStackNavigator<StackParamList>();

function Router() {
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
        <Stack.Screen name='home' component={Home} options={{title: 'English One', headerTitleAlign: 'left'}} />
        <Stack.Screen name='settings' component={Settings} options={{title: 'Ustawienia', headerRight: undefined}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default memo(Router);
