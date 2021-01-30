import * as Network from 'expo-network';
import {NetworkState} from 'expo-network/src/Network.types';

import networkSlice, {INetworkInfo} from '@/redux-store/features/network/slice';
import {convertToNetworkInfo} from '@/redux-store/features/network/utils';
import {DispatchType, ThunkFn} from '@/redux-store/types';

export const determineInitialNetworkInfoAction: ThunkFn = () => async (dispatch: DispatchType) => {
  const networkState: NetworkState = await Network.getNetworkStateAsync();
  const networkInfo: INetworkInfo = convertToNetworkInfo(networkState);
  await dispatch(networkSlice.actions.updateNetworkInfo(networkInfo));
};
