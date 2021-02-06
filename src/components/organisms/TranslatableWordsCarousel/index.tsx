import {makeStyles} from '@idkman/react-native-styles';
import React, {ForwardedRef, forwardRef, memo, MutableRefObject, useCallback, useEffect, useRef} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {IMAGE_CARD_FULL_WIDTH} from '@/components/molecules/ImageCard';
import WordCard from '@/components/molecules/WordCard';
import IQuestion from '@/models/IQuestion';

export interface ITranslatableWordsCarouselProps {
  questions: IQuestion[];
  onEndReached?: (info: {distanceFromEnd: number}) => unknown;
  activeTaskIndex: number;
}

const useStyles = makeStyles(() => ({
  root: {
    marginVertical: 16,
    marginBottom: 'auto',
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
}));

const TranslatableWordsCarousel = forwardRef(
  (props: ITranslatableWordsCarouselProps, ref: ForwardedRef<FlatList<IQuestion> | null>) => {
    const {questions, onEndReached, activeTaskIndex} = props;
    const stylesheet = useStyles();
    const listRef: MutableRefObject<FlatList<IQuestion> | null> = useRef(null);

    const handleRenderItem = useCallback(({item, index}: ListRenderItemInfo<IQuestion>) => {
      return <WordCard key={index} question={item.question} />;
    }, []);

    useEffect(() => {
      if (typeof ref === 'function') ref(listRef.current);
      else if (ref) ref.current = listRef.current;
    }, [ref, listRef]);

    return (
      <FlatList
        horizontal
        ref={listRef}
        data={questions}
        keyExtractor={(image: IQuestion) => image.id.toString()}
        initialNumToRender={3}
        initialScrollIndex={activeTaskIndex}
        getItemLayout={(data, index) => ({length: IMAGE_CARD_FULL_WIDTH, offset: IMAGE_CARD_FULL_WIDTH * index, index})}
        renderItem={handleRenderItem}
        style={stylesheet.root}
        contentContainerStyle={stylesheet.contentContainer}
        showsHorizontalScrollIndicator={false}
        onEndReached={onEndReached}
        scrollEnabled={false}
      />
    );
  }
);

export default memo(TranslatableWordsCarousel);
