import {makeStyles, useTheme} from '@idkman/react-native-styles';
import React, {useCallback} from 'react';
import {IconButton} from 'react-native-paper';

import IDialogueInfo from '@/models/IDialogueInfo';
import IListItemIconProps from '@/models/IListItemIconProps';
import {ITheme} from '@/models/theme/ITheme';

const useStyles = makeStyles(() => ({
  icon: {
    alignSelf: 'center',
  },
}));

export default function useRenderListItemIconHandler(solvedDialogues: number[]) {
  const theme: ITheme = useTheme();
  const stylesheet = useStyles();

  return useCallback(
    (dialogue: IDialogueInfo) => (props: IListItemIconProps) => {
      const isSolved = solvedDialogues.includes(dialogue.id);
      const iconName = isSolved ? 'star' : 'arrow-right-drop-circle-outline';

      return (
        <IconButton
          icon={iconName}
          color={isSolved ? theme.palette.primary.main : props.color}
          style={[props.style, stylesheet.icon]}
        />
      );
    },
    [solvedDialogues]
  );
}
