'use client';

import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import SearchSpotItem from '@/app/(_components)/course/SearchSpotItem';
import SpotRecommend from '@/app/(_components)/course/SpotRecommend';
import search from '/public/images/icons/search.svg';
import { useState } from 'react';

export default function SpotSearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ICourseList[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ICourseList | null>(null);
  const [detailId, setDetailId] = useState(0);

  const handleSearch = () => {
    if (!query.trim()) return;

    // 임시 데이터
    setSearchResults([
      {
        touristId: 1,
        region: '서울',
        images: '',
        title: '서울타워',
        address: '서울특별시 용산구 남산공원길 105',
        tel: '010-1234-5567',
        latitude: 37.5511694,
        longitude: 126.9882266,
      },
      {
        touristId: 2,
        region: '서울',
        images: '',
        title: '광화문',
        address: '서울특별시 종로구 세종대로 175',
        tel: '010-1234-5567',
        latitude: 37.5759291,
        longitude: 126.9768626,
      },
    ]);

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

        {searchResults === null ? (
          <SpotRecommend setDetailId={setDetailId} />
        ) : (
          <ul className="mt-[12px] flex flex-col gap-2">
            {searchResults.map((spot, idx) => (
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
          </ul>
        )}
      </div>

      <button
        className={`w-full py-[16px] rounded-lg border font-semibold outline-none ${
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
