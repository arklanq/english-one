import {Dispatch, useCallback} from 'react';

import {Action} from './useLocalState';

export default function useDimissIntroductionHandler(dispatch: Dispatch<Action>) {
  return useCallback(() => {
    dispatch({type: 'switchIntroduction', payload: false});
  }, [dispatch]);
}
