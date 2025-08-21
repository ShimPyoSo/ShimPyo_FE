'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import AutoComplete from './AutoComplete';
import Image from 'next/image';
import search from '/public/images/icons/search.svg';

export default function SearchInput() {
  const { word } = useParams();

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const isStoreActive = localStorage.getItem('shimpyo_history');
    setIsActive(isStoreActive !== 'false');
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (word) setQuery(decodeURIComponent(word as string));
  }, [word]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    if (isActive) {
      const existing = JSON.parse(localStorage.getItem('shimpyo_keywords') || '[]');
      const updated = [trimmed, ...existing.filter((q: string) => q !== trimmed)].slice(0, 10);
      localStorage.setItem('shimpyo_keywords', JSON.stringify(updated));
    }
    router.push(`/search/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3 hover:border-gn1"
        placeholder="어떤 여행지에 쉼표를 찍어볼까요?"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Image
        className="absolute right-[16px] top-[22px] cursor-pointer"
        src={search}
        alt="검색"
        width={22}
        height={22}
        onClick={handleSearch}
        role="button"
      />
      {isFocused && <AutoComplete isActive={isActive} query={query} />}
    </div>
  );
}
