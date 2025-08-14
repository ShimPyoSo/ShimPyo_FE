'use client';

import { useEffect, useState } from 'react';

import CategoryHeader from '@/app/(_components)/category/CategoryHeader';
import Filter from './Filter/Filter';
import { IFilter } from '@/app/(_utils)/type';
import { SORT_BY } from '@/app/(_utils)/type';
import Sort from './Sort';
import SpotListItem from './SpotListItem';
import SpotSkeleton from './SpotSkeleton';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useSearchParams } from 'next/navigation';

export default function CategoryComponent({ type }: { type: 'list' | 'like' }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('type') ?? '';
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    reservation: [],
    facilities: [],
    target: [[], []],
    visitTime: '',
  }); // 선택한 필터 옵션
  const [selectedOption, setSelectedOption] = useState<(typeof SORT_BY)[number]>(SORT_BY[0]);

  useEffect(() => setMounted(true), []);

  const fetchReviews = async ({ pageParam = 0 }) => {
    const likesIdParam = pageParam !== 0 ? `&likesId=${pageParam}` : '';
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes?category=${category}${likesIdParam}`,
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

  if (!mounted) return null;

  return (
    <>
      <div className="bg-w1">
        <CategoryHeader />
        {type === 'list' && (
          <>
            <Filter filter={filter} setFilter={setFilter} />
            <Sort selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          </>
        )}
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
