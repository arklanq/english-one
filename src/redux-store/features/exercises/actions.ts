/*export const determineInitialNetworkInfoAction: ThunkFn = () => async (dispatch: DispatchType) => {
  const networkState: NetworkState = await Network.getNetworkStateAsync();
  const networkInfo: INetworkInfo = convertToNetworkInfo(networkState);
  await dispatch(networkSlice.actions.updateNetworkInfo(networkInfo));
};*/
