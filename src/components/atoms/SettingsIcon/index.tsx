import React, {memo, useCallback} from 'react';
import {IconButton} from 'react-native-paper';

import {INavigateGlobally} from '@/components/other/Router';

export interface ISettingsIconProps {
  navigateGlobally: INavigateGlobally;
  color?: string;
  tintColor?: string;
}

function SettingsIcon(props: ISettingsIconProps) {
  const {navigateGlobally, color = 'white', tintColor = '#fafafa'} = props;

  const handlePress = useCallback(() => {
    navigateGlobally('settings');
  }, []);

  return <IconButton icon='cog-outline' color={color} rippleColor={tintColor} size={28} onPress={handlePress} />;
}

export default memo(SettingsIcon);
