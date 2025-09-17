'use client';

import Filter from '@/app/(_components)/category/Filter/Filter';
import { IFilter } from '@/app/(_utils)/type';
import NoResult from '@/app/(_components)/search/NoResult';
import SpotListItem from '@/app/(_components)/category/SpotListItem';
import SpotSkeleton from '../category/SpotSkeleton';
import { useFetchSearchWord } from '@/app/(_utils)/hooks/useFetchSearchWord';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchResultList() {
  const { word } = useParams();
  const safeWord: string = Array.isArray(word) ? word.join(',') : word || '';
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    facilities: [],
    target: [[], []],
    visitTime: '',
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useFetchSearchWord({
    word: safeWord,
    filter,
  });

  const allResults = data?.pages.flatMap((page) => page) ?? [];
  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <section>
      <Filter filter={filter} setFilter={setFilter} refetch={refetch} />

      {isLoading && allResults.length === 0 ? (
        <ul className="px-[16px] pb-[20px] flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <SpotSkeleton key={i} type="spot" />
          ))}
        </ul>
      ) : allResults.length === 0 ? (
        <NoResult type="search" />
      ) : (
        <div className="flex-1">
          <ul className="px-[16px] pb-[20px] flex-1 overflow-auto">
            {allResults.map((spot) => (
              <SpotListItem key={spot.id || spot.touristId} type="spot" spot={spot} />
            ))}
            <div ref={observerRef} className="h-10" />
          </ul>
        </div>
      )}
    </section>
  );
}
