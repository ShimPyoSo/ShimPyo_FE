'use client';

import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import SearchSpotItem from '@/app/(_components)/course/SearchSpotItem';
import SpotRecommend from '@/app/(_components)/course/SpotRecommend';
import search from '/public/images/icons/search.svg';
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

  const handleSearch = () => {
    if (!query.trim()) return;
    refetch();
    setSelectedSpot(null); // 검색 후 선택 초기화
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleAdd = () => {
    if (!selectedSpot || !window.opener) return;

    window.opener.postMessage(selectedSpot, window.location.origin);
    window.close();
  };

  return (
    <div
      className="bg-w1 px-[16px] pb-[40px] flex flex-col justify-between"
      style={{ minHeight: 'calc(100vh - 52px)' }}
    >
      <div>
        <div className="relative">
          <input
            className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3 hover:border-gn1"
            placeholder="어떤 여행지에 쉼표를 찍어볼까요?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Image
            className="absolute right-[16px] top-[22px] cursor-pointer"
            src={search}
            alt="검색"
            width={22}
            height={22}
            role="button"
            onClick={handleSearch}
          />
        </div>

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

      <button
        className={`fixed bottom-[20px] w-[343px] py-[16px] rounded-lg border font-semibold outline-none ${
          selectedSpot ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
        }`}
        disabled={!selectedSpot}
        onClick={handleAdd}
      >
        여행지 추가하기
      </button>
    </div>
  );
}
