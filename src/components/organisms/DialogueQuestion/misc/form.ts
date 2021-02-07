import {object, string} from 'yup';

export interface IFormValues {
  answer: string;
}

export const initialValues: IFormValues = {
  answer: '',
};

export const validationSchema = object()
  .required()
  .shape({
    answer: string().label('Odpowiedź').required('Wymagana odpowiedź'),
  });
