// useMergeProps(...) - doesn't use memo(), because this can break deeply nested things if component isn't a pure one!
export default function useMergeProps<P extends object>(
  ...args: Partial<P | ((props: P) => Partial<P>) | undefined>[]
): P {
  return args.reduce((builtProps: P, props) => {
    return Object.assign(builtProps, typeof props === 'function' ? props(builtProps) : props);
  }, {} as P);
}
