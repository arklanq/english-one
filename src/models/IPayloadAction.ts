export default interface IPayloadAction<N extends string, T = void> {
  type: N;
  payload: T;
}
