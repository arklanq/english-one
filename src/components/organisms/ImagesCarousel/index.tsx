import {makeStyles} from '@idkman/react-native-styles';
import React, {ForwardedRef, forwardRef, memo, MutableRefObject, useCallback, useEffect, useRef} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import ImageCard, {IMAGE_CARD_FULL_WIDTH} from '@/components/organisms/ImageCard';
import IImage from '@/models/IImage';

export interface IImagesCarouselProps {
  images: IImage[];
  onEndReached?: (info: {distanceFromEnd: number}) => unknown;
  activeQuestionIndex: number;
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

const ImagesCarousel = forwardRef((props: IImagesCarouselProps, ref: ForwardedRef<FlatList<IImage> | null>) => {
  const {images, onEndReached, activeQuestionIndex} = props;
  const stylesheet = useStyles();
  const listRef: MutableRefObject<FlatList<IImage> | null> = useRef(null);

  const handleRenderItem = useCallback(({item, index}: ListRenderItemInfo<IImage>) => {
    return <ImageCard key={index} imgURL={item.imageUrl} />;
  }, []);

  useEffect(() => {
    if (typeof ref === 'function') ref(listRef.current);
    else if (ref) ref.current = listRef.current;
  }, [ref, listRef]);

  return (
    <FlatList
      horizontal
      ref={listRef}
      data={images}
      keyExtractor={(image: IImage) => image.id.toString()}
      initialNumToRender={3}
      initialScrollIndex={activeQuestionIndex}
      getItemLayout={(data, index) => ({length: IMAGE_CARD_FULL_WIDTH, offset: IMAGE_CARD_FULL_WIDTH * index, index})}
      renderItem={handleRenderItem}
      style={stylesheet.root}
      contentContainerStyle={stylesheet.contentContainer}
      showsHorizontalScrollIndicator={false}
      onEndReached={onEndReached}
      scrollEnabled={false}
    />
  );
});

export default memo(ImagesCarousel);
