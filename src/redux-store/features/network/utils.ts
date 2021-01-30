import {NetInfoStateType} from '@react-native-community/netinfo';
import {NetInfoState} from '@react-native-community/netinfo/src/internal/types';
import {NetworkState} from 'expo-network';

import {INetworkInfo} from '@/redux-store/features/network/slice';

export function convertToNetworkInfo(netState: NetInfoState | NetworkState): INetworkInfo {
  return {
    type: (netState.type?.toLowerCase() as NetInfoStateType) ?? 'unknown',
    isConnected: netState.isConnected ?? false,
    isReachable: (netState.isConnected && netState.isInternetReachable === true) ?? false,
  };
}
