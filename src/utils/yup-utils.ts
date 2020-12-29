import {ValidationError} from 'yup';

export function getValidationErrorMessage(e: unknown): string {
  return e instanceof ValidationError ? e.message : 'unknown valiation error';
}
