import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollProps {
  threshold?: number;
  onReachEnd: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

/**
 * Hook pour gérer le scroll infini
 */
export const useInfiniteScroll = ({
  threshold = 200,
  onReachEnd,
  hasMore,
  isLoading
}: UseInfiniteScrollProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: `0px 0px ${threshold}px 0px`,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      onReachEnd();
    }
  }, [isIntersecting, hasMore, isLoading, onReachEnd]);

  return { ref, isIntersecting };
};