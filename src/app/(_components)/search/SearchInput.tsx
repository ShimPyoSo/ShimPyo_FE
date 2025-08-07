'use client';

import Image from 'next/image';
import WordItem from './WordItem';
import search from '/public/images/icons/search.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchInputProps {
  isActive: boolean;
}

export default function SearchInput({ isActive }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
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
      {isFocused && (
        <ul className="absolute top-[68px] w-full h-[212px] bg-white rounded-lg overflow-y-auto shadow-[0px_6px_20px_0px_#00000014]">
          {['검색어'].map((word, idx) => {
            return <WordItem isActive={isActive} searchWord={word} key={idx} />;
          })}
        </ul>
      )}
    </div>
  );
}
