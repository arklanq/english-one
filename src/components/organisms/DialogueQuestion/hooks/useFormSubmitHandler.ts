import {FormikHelpers} from 'formik/dist/types';
import {useCallback} from 'react';

import {IFormValues} from '@/components/organisms/DialogueQuestion/misc/form';
import IDialogueAnswer from '@/models/IDialogueAnswer';

export default function useFormSubmitHandler(answers: IDialogueAnswer[], proceed: () => unknown) {
  return useCallback(
    (values: IFormValues, helpers: FormikHelpers<IFormValues>) => {
      const answer = answers.find(
        (answer: IDialogueAnswer) => answer.id.toString() === values.answer
      ) as IDialogueAnswer;

      if (answer.isCorrect) proceed();
      else helpers.setFieldError('answer', answer.helperText);
    },
    [answers]
  );
}
