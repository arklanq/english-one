import {WebSQLDatabase} from 'expo-sqlite';
import {Dispatch, useCallback, useEffect} from 'react';

import queryDialogueList from '@/database/queries/queryDialogueList';
import useIsMounted from '@/hooks/useIsMounted';
import useSQLite from '@/hooks/useSQLite';
import IDialogueInfo from '@/models/IDialogueInfo';

import {Action} from './useLocalState';

export default function useFetchDialoguesList(dispatch: Dispatch<Action>) {
  const db: WebSQLDatabase = useSQLite();
  const isMounted: () => boolean = useIsMounted();

  const runAsync = useCallback(async () => {
    const list: IDialogueInfo[] = await queryDialogueList(db);

    if (isMounted()) {
      dispatch({type: 'setDialoguesList', payload: list});
    }
  }, [db, dispatch]);

  useEffect(() => {
    runAsync();
  }, [runAsync]);
}
