import React, {useCallback} from 'react';
import {View} from 'react-native';
import {RadioButton} from 'react-native-paper';

import IDialogueAnswer from '@/models/IDialogueAnswer';

import {IFormValues} from '../misc/form';

export default function useRenderRadioButton() {
  return useCallback(
    (values: IFormValues, answer: IDialogueAnswer) => () => (
      <View style={{alignSelf: 'center'}}>
        <RadioButton
          value={answer.id.toString()}
          status={values.answer === answer.id.toString() ? 'checked' : 'unchecked'}
        />
      </View>
    ),
    []
  );
}
