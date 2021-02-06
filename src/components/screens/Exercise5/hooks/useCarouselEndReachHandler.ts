import {Dispatch, useCallback} from 'react';

import {Action} from './useLocalState';

export default function useCarouselEndReachHandler(dispatch: Dispatch<Action>) {
  return useCallback(() => dispatch({type: 'setEndReached', payload: true}), [dispatch]);
}
