import {AxiosError} from 'axios';

export function isAxiosError<T = any>(obj: any): obj is AxiosError<T> {
  return typeof obj === 'object' && obj !== null && typeof obj.isAxiosError === 'boolean' && obj.isAxiosError;
}
