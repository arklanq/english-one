import {FormikProps} from 'formik';
import {MutableRefObject, useCallback} from 'react';

import {IFormValues} from '@/components/organisms/DialogueQuestion/misc/form';
import IDialogueAnswer from '@/models/IDialogueAnswer';

export default function useListItemPressHandler(formikRef: MutableRefObject<FormikProps<IFormValues> | null>) {
  return useCallback(
    (answer: IDialogueAnswer) => () => {
      formikRef.current?.setFieldValue('answer', answer.id.toString());
    },
    [formikRef]
  );
}
