import {useCallback, useEffect, useRef} from 'react';

const useIsMounted = () => {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => {
    return ref.current;
  }, [ref]);
};

export default useIsMounted;
