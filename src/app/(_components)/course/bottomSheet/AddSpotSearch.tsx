'use client';

import AutoComplete from '../../search/AutoComplete';
import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import axios from 'axios';
import search from '/public/images/icons/search.svg';
import { useState } from 'react';

interface AddSpotSearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  type: 'search' | 'kakao';
  refetch?: () => void;
  setSelectedSpot: React.Dispatch<React.SetStateAction<ICourseList | null>>;
  setSearchResults?: React.Dispatch<React.SetStateAction<ICourseList[] | null>>;
}

export default function AddSpotSearch({
  query,
  setQuery,
  type,
  refetch,
  setSelectedSpot,
  setSearchResults,
}: AddSpotSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    if (type === 'search') {
      refetch?.();
      setSelectedSpot(null);
    } else if (type === 'kakao') {
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

        setSearchResults?.(spots);
        setSelectedSpot(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative z-10">
      <input
        className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3 hover:border-gn1"
        placeholder="어떤 여행지에 쉼표를 찍어볼까요?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
      {type === 'search' && isFocused && query.trim().length > 0 && <AutoComplete isActive={false} query={query} />}
    </div>
  );
}
