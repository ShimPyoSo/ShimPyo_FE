'use client';

import AddSpotSearch from '@/app/(_components)/course/AddSpotSearch';
import CourseAddButton from '@/app/(_components)/course/CourseAddButton';
import { ICourseList } from '@/app/(_utils)/type';
import SearchSpotItem from '@/app/(_components)/course/SearchSpotItem';
import SpotRecommend from '@/app/(_components)/course/SpotRecommend';
import { useFetchSearchWord } from '@/app/(_utils)/hooks/useFetchSearchWord';
import useInfiniteScroll from '@/app/(_utils)/hooks/useInfiniteScroll';
import { useState } from 'react';

export default function SpotSearch() {
  const [query, setQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ICourseList | null>(null);
  const [detailId, setDetailId] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useFetchSearchWord({
    word: query.trim(),
    enabled: !!query.trim(),
  });

  const allResults =
    data?.pages.flatMap((page) =>
      page.map((item) => ({
        ...item,
        touristId: item.touristId ?? item.id,
      }))
    ) ?? [];

  const observerRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  return (
    <div
      className="bg-w1 px-[16px] pb-[40px] flex flex-col justify-between"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      <div>
        <AddSpotSearch
          type="search"
          refetch={refetch}
          setSelectedSpot={setSelectedSpot}
          query={query}
          setQuery={setQuery}
        />

        <p className="mt-[23px] font-semibold text-b1 tracking-[-1.3%]">이런 여행지는 어때요?</p>

        {allResults.length === 0 && !isLoading ? (
          <SpotRecommend setDetailId={setDetailId} />
        ) : (
          <ul className="mt-[12px] flex flex-col gap-2">
            {allResults.map((spot, idx) => (
              <SearchSpotItem
                spot={spot}
                selectedSpot={selectedSpot}
                setSelectedSpot={setSelectedSpot}
                detailId={detailId}
                setDetailId={setDetailId}
                key={idx}
                type="search"
              />
            ))}
            <div ref={observerRef} className="h-10" />
          </ul>
        )}
      </div>

      <CourseAddButton type="search" selectedSpot={selectedSpot} />
    </div>
  );
}
