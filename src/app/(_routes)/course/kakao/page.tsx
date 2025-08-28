'use client';

import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import SearchSpotItem from '@/app/(_components)/course/SearchSpotItem';
import SpotRecommend from '@/app/(_components)/course/SpotRecommend';
import axios from 'axios';
import search from '/public/images/icons/search.svg';
import { useState } from 'react';

export default function SpotSearchKaKao() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ICourseList[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ICourseList | null>(null);
  const [detailId, setDetailId] = useState(0);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spots: ICourseList[] = response.data.documents.map((item: any) => ({
        touristId: item.id,
        region: item.address_name.split(' ')[0],
        images: '',
        title: item.place_name,
        address: item.road_address_name || item.address_name,
        tel: item.phone,
        latitude: parseFloat(item.y),
        longitude: parseFloat(item.x),
        placeURL: item.place_url,
      }));
      setSearchResults(spots);
      setSelectedSpot(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleAdd = () => {
    if (!selectedSpot || !window.opener) return;

    const spotToSend = {
      ...selectedSpot,
      touristId: -1,
    };

    window.opener.postMessage(spotToSend, window.location.origin);
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
          <ul className="mt-[12px] mb-[60px] flex flex-col gap-2">
            {searchResults.map((spot, idx) => (
              <SearchSpotItem
                spot={spot}
                selectedSpot={selectedSpot}
                setSelectedSpot={setSelectedSpot}
                detailId={detailId}
                setDetailId={setDetailId}
                key={idx}
                type="kakao"
              />
            ))}
          </ul>
        )}
      </div>

      <div className="fixed bottom-[20px] flex justify-center z-[999]">
        <button
          className={`w-[343px] py-[16px] border font-semibold rounded-lg ${
            selectedSpot ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
          }`}
          disabled={!selectedSpot}
          onClick={handleAdd}
        >
          여행지 추가하기
        </button>
      </div>
    </div>
  );
}
