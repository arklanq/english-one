import {SchemaOf, ValidationError} from 'yup';

export function getValidationErrorMessage(e: unknown): string {
  return e instanceof ValidationError ? e.message : 'unknown valiation error';
}

export function validateSync<T>(schema: SchemaOf<T | any>, data: unknown): asserts data is T {
  schema.validateSync(data, {strict: true, stripUnknown: true, abortEarly: true});
}
