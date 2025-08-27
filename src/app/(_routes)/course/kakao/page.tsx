'use client';

import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotRecommend from '@/app/(_components)/course/SpotRecommend';
import axios from 'axios';
import search from '/public/images/icons/search.svg';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SpotSearchKaKao() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ISpot[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ISpot | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}`);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const spots: ISpot[] = response.data.documents.map((item: any) => ({
        touristId: -1,
        region: item.category_name,
        images: '',
        title: item.place_name,
        address: item.road_address_name || item.address_name,
        latitude: parseFloat(item.y),
        longitude: parseFloat(item.x),
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
          />
        </div>

        <p className="mt-[23px] font-semibold text-b1 tracking-[-1.3%]">이런 여행지는 어때요?</p>

        {searchResults === null ? (
          <SpotRecommend />
        ) : (
          <ul className="mt-[12px] mb-[60px] flex flex-col gap-2">
            {searchResults.map((spot) => (
              <li
                key={uuidv4()}
                className={`p-2 border rounded-md cursor-pointer ${
                  selectedSpot?.title === spot.title && selectedSpot?.address === spot.address
                    ? 'border-gn1 bg-gn1/10'
                    : 'border-w4'
                }`}
                onClick={() =>
                  selectedSpot?.title === spot.title && selectedSpot?.address === spot.address
                    ? setSelectedSpot(null)
                    : setSelectedSpot(spot)
                }
              >
                <p className="font-semibold">{spot.title}</p>
                <p className="text-xs text-g1">{spot.address}</p>
              </li>
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
