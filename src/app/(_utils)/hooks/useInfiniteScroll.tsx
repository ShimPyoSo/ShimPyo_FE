import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage }: UseInfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
          observer.unobserve(entries[0].target);
        }
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return observerRef;
}
