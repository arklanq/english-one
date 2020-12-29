import {StyleSheet} from 'react-native';
import NamedStyles = StyleSheet.NamedStyles;

export type ClassNameMap<T extends NamedStyles<T> | NamedStyles<any>, ClassKey extends string = string> = Record<
  ClassKey,
  NamedStyles<T>
>;

export type OverrideClassesProp<
  T extends NamedStyles<T> | NamedStyles<any>,
  S extends ((props?: P) => ClassNameMap<T>) | ((props: P) => ClassNameMap<T>),
  P extends object = object
> =
  | Partial<Record<keyof ReturnType<S>, string | undefined>>
  | ((classes: Record<keyof ReturnType<S>, string>) => Partial<Record<keyof ReturnType<S>, string | undefined>>);
