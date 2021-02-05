import {MutableRefObject, useEffect} from 'react';
import {FlatList} from 'react-native';

import usePrevious from '@/hooks/usePrevious';
import IImage from '@/models/IImage';

export default function useActiveQuestionIndexController(
  activeQuestionIndex: number,
  carouselRef: MutableRefObject<FlatList<IImage> | null>
) {
  const prevActiveQuestionIndex = usePrevious(activeQuestionIndex);

  useEffect(() => {
    if (prevActiveQuestionIndex !== activeQuestionIndex)
      carouselRef.current?.scrollToIndex({
        index: activeQuestionIndex,
        animated: true,
      });
  }, [prevActiveQuestionIndex, activeQuestionIndex, carouselRef]);
}
