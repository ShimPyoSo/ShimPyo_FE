'use client';

import CategoryHeader from '@/app/(_components)/category/CategoryHeader';
import Filter from './Filter/Filter';
import SpotListItem from './SpotListItem';
import SpotSkeleton from './SpotSkeleton';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useSearchParams } from 'next/navigation';

export default function CategoryComponent({ type }: { type: 'list' | 'like' }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('type') ?? '';

  const fetchReviews = async ({ pageParam = 0 }) => {
    const likesIdParam = pageParam !== 0 ? `&likesId=${pageParam}` : '';
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes??category=${category}${likesIdParam}`,
      { withCredentials: true }
    );
    return Array.isArray(res.data) ? res.data : [];
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['likedSpots'],
    queryFn: fetchReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !Array.isArray(lastPage)) {
        return undefined;
      }
      if (lastPage.length < 8) {
        return undefined;
      }
      const lastReview = lastPage[lastPage.length - 1];
      return lastReview.likesId;
    },
    refetchOnWindowFocus: false,
  });

  const allSpots = data?.pages.flatMap((page) => page) ?? [];
  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <>
      <div className="bg-w1">
        <CategoryHeader />
        {type === 'list' && <Filter />}
        {isLoading ? (
          <ul className="px-[16px] pb-[20px] flex-1 overflow-y-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <SpotSkeleton key={i} type="spot" />
            ))}
          </ul>
        ) : (
          <ul className="px-[16px] pb-[20px] flex-1 overflow-y-auto">
            {allSpots.map((spot) => (
              <SpotListItem key={spot.likesId} type="spot" />
            ))}
            <div ref={observerRef} className="h-10" />
          </ul>
        )}
      </div>
    </>
  );
}
