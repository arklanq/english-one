import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {NetInfoState} from '@react-native-community/netinfo/src/internal/types';
import {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

import networkSlice from '@/redux-store/features/network/slice';
import {convertToNetworkInfo} from '@/redux-store/features/network/utils';
import {DispatchType} from '@/redux-store/types';

export default function useNetworkInfoController() {
  const dispatch: DispatchType = useDispatch();
  const subscriptionRef = useRef<NetInfoSubscription>();

  const networkChangeListener = useCallback(
    (state: NetInfoState) => {
      const networkInfo = convertToNetworkInfo(state);
      dispatch(networkSlice.actions.updateNetworkInfo(networkInfo));
    },
    [dispatch]
  );

  useEffect(() => {
    subscriptionRef.current = NetInfo.addEventListener(networkChangeListener);

    return () => {
      subscriptionRef.current?.();
    };
  }, [subscriptionRef, networkChangeListener]);
}
