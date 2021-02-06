import {WebSQLDatabase} from 'expo-sqlite';
import {Dispatch, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import useIsMounted from '@/hooks/useIsMounted';
import usePrevious from '@/hooks/usePrevious';
import useSQLite from '@/hooks/useSQLite';
import ErrorReporting from '@/mechanisms/ErrorReporting';
import {selectExerciseSolvedQuestions} from '@/redux-store/features/exercises/selectors';

import IGuessImageTask from '../models/IGuessImageTask';
import queryTasks from '../operations/queryTasks';
import {Action, ILocalState} from './useLocalState';

export default function useQuestionsPopulator(state: ILocalState, dispatch: Dispatch<Action>): void {
  const {tasks, endReached, poolExhausted, skippedTasks} = state;
  const solvedTasks = useSelector(selectExerciseSolvedQuestions(2));
  const isMounted: () => boolean = useIsMounted();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const prevStatus = usePrevious(status);
  const db: WebSQLDatabase = useSQLite();
  const shouldLoad: boolean = (endReached && !poolExhausted) || tasks.length === 0;
  const prevShouldLoad: boolean | undefined = usePrevious(shouldLoad);

  const runAsyncAction = useCallback(async () => {
    try {
      const newQuestions: IGuessImageTask[] = await queryTasks(
        db,
        tasks.map((task) => task.image.id),
        solvedTasks,
        skippedTasks
      );
      if (isMounted()) {
        if (newQuestions.length > 0) dispatch({type: 'pushNewQuestions', payload: newQuestions});
        else dispatch({type: 'setPoolExhausted', payload: true});
      }
    } catch (e: unknown) {
      ErrorReporting.captureError(e);
      if (isMounted()) setStatus('error');
    }
  }, [db, tasks, setStatus, dispatch]);

  useEffect(() => {
    if (status === 'idle' && !prevShouldLoad && shouldLoad) setStatus('loading');
    else if (status === 'loading' && prevShouldLoad && !shouldLoad) setStatus('idle');
  }, [status, endReached, poolExhausted, setStatus]);

  useEffect(() => {
    if (prevStatus !== status && status === 'loading') runAsyncAction();
  }, [status, prevStatus, runAsyncAction]);
}
