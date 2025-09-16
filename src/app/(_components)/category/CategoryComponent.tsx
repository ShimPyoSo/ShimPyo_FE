'use client';

import { useEffect, useState } from 'react';

import CategoryHeader from '@/app/(_components)/category/CategoryHeader';
import FilterNSort from './FilterNSort';
import { IFilter } from '@/app/(_utils)/type';
import NoLiked from './NoLiked';
import NoResult from '../search/NoResult';
import { SORT_BY } from '@/app/(_utils)/type';
import SpotListItem from './SpotListItem';
import SpotSkeleton from './SpotSkeleton';
import { useFetchCategorySpot } from '@/app/(_utils)/hooks/useFetchCategorySpot';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';

export default function CategoryComponent({ type }: { type: 'list' | 'like' }) {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    facilities: [],
    target: [[], []],
    visitTime: '',
  });
  const [selectedOption, setSelectedOption] = useState<(typeof SORT_BY)[number]>(SORT_BY[0]);

  useEffect(() => setMounted(true), []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useFetchCategorySpot({
    filter: filter,
    type: type,
    selectedOption: selectedOption,
  });

  const allSpots = data?.pages.flatMap((page) => page) ?? [];
  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  if (!mounted) return null;

  return (
    <div className="bg-w1 relative min-h-screen">
      <CategoryHeader />
      <div className="bg-w1 flex-1 flex flex-col">
        <div className="sticky top-0 z-10">
          <FilterNSort
            filter={filter}
            setFilter={setFilter}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            type={type}
            refetch={refetch}
            spots={allSpots}
            isLoading={isLoading}
          />
        </div>
        <div
          className={`px-[16px] scrollbar-hide bg-w1 flex-1 z-8 scrollable-div ${
            isLoading || allSpots.length > 0 ? 'overflow-y-auto' : 'overflow-y-hidden'
          }`}
          style={{ minHeight: 'calc(100vh - 165px)' }}
        >
          <ul className="bg-w1">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SpotSkeleton key={i} type="spot" />)
            ) : allSpots.length > 0 ? (
              allSpots.map((spot, idx) => <SpotListItem key={idx} type="spot" spot={spot} />)
            ) : type === 'like' ? (
              <NoLiked
                type="spot"
                main={'지금 다양한 여행지를 탐색해 보세요!'}
                description={'아직 찜한 여행지가 없어요'}
              />
            ) : (
              <li>
                <NoResult type="category" />
              </li>
            )}
            <div ref={observerRef} className="h-10" />
          </ul>
        </div>
      </div>
    </div>
  );
}
