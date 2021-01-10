import {NetInfoState} from '@react-native-community/netinfo/src/internal/types';

import {INetworkInfo} from '@/redux-store/features/network/slice';

export function convertToNetworkInfo(netInfoState: NetInfoState): INetworkInfo {
  return {
    type: netInfoState.type,
    isConnected: netInfoState.isConnected,
    isReachable: netInfoState.isConnected && netInfoState.isInternetReachable === true,
  };
}
