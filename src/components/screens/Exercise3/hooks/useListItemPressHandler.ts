import {useCallback} from 'react';

import {ScreenNavigationProp, StackParamList} from '@/components/other/Router';
import IDialogueInfo from '@/models/IDialogueInfo';

export default function useListItemPressHandler(navigation: ScreenNavigationProp<keyof StackParamList>) {
  return useCallback(
    (dialogue: IDialogueInfo) => () => {
      navigation.navigate('dialogue', {dialogue});
    },
    [navigation]
  );
}
