import {Dispatch, useCallback} from 'react';

import {Action} from './useLocalState';

export default function useCongratsInfoDismissHandler(dispatch: Dispatch<Action>) {
  return useCallback(() => {
    dispatch({type: 'updateUserInteractions', payload: {dismissedCongratsScreen: true}});
  }, [dispatch]);
}
