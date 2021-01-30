import {ObjectKeys} from '@/utils/typescript-utils';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
