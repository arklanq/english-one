import {MutableRefObject, useEffect} from 'react';
import {FlatList} from 'react-native';

import usePrevious from '@/hooks/usePrevious';
import IImage from '@/models/IImage';

export default function useActiveQuestionIndexController(
  activeTaskIndex: number,
  carouselRef: MutableRefObject<FlatList<IImage> | null>
) {
  const prevActiveQuestionIndex = usePrevious(activeTaskIndex);

  useEffect(() => {
    if (prevActiveQuestionIndex !== activeTaskIndex)
      carouselRef.current?.scrollToIndex({
        index: activeTaskIndex,
        animated: true,
      });
  }, [prevActiveQuestionIndex, activeTaskIndex, carouselRef]);
}
