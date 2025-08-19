'use client';

import Filter from '@/app/(_components)/category/Filter/Filter';
import { IFilter } from '@/app/(_utils)/type';
import NoResult from '@/app/(_components)/search/NoResult';
import SpotListItem from '@/app/(_components)/category/SpotListItem';
import axios from 'axios';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { useAtomValue } from 'jotai';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchResultList() {
  const { word } = useParams();
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    facilities: [],
    target: [[], []],
    visitTime: '',
  });
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const fetchSearchResults = async ({ pageParam = 0 }: { pageParam?: number }) => {
    const params: Record<string, string> = {
      keyword: Array.isArray(word) ? word.join(',') : word || '',
    };

    if (filter.region.length > 0) params.region = filter.region.join('|');
    if (filter.facilities.length > 0) params.facilities = filter.facilities.join('|');
    if (filter.visitTime) params.visitTime = filter.visitTime;
    if (filter.target[0].length > 0) params.gender = filter.target[0].join('|');
    if (filter.target[1].length > 0) params.ageGroup = filter.target[1].join('|');
    if (pageParam) params.lastId = String(pageParam);

    const queryString = new URLSearchParams(params).toString();
    const url = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search?${queryString}`;

    const res = await axios.get(url, { withCredentials: isLoggedIn });
    return Array.isArray(res.data) ? res.data : [];
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
    queryKey: ['search', word],
    queryFn: fetchSearchResults,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !Array.isArray(lastPage)) {
        return undefined;
      }
      if (lastPage.length < 8) {
        return undefined;
      }
      const lastItem = lastPage[lastPage.length - 1];
      return lastItem.id;
    },
    refetchOnWindowFocus: false,
  });

  const allResults = data?.pages.flatMap((page) => page) ?? [];
  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <section>
      <Filter filter={filter} setFilter={setFilter} refetch={refetch} />

      {isLoading && allResults.length === 0 ? (
        <ul className="px-[16px] pb-[20px] flex-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <SpotListItem key={i} type="spot" />
          ))}
        </ul>
      ) : allResults.length === 0 ? (
        <NoResult />
      ) : (
        <ul className="px-[16px] pb-[20px] flex-1">
          {allResults.map((spot) => (
            <SpotListItem key={spot.id} type="spot" />
          ))}
          <div ref={observerRef} className="h-10" />
        </ul>
      )}
    </section>
  );
}
