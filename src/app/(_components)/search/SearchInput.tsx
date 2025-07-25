'use client';

import Image from 'next/image';
import search from '/public/images/icons/search.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SearchInputProps {
  isActive: boolean;
}

export default function SearchInput({ isActive }: SearchInputProps) {
  const [query, setQuery] = useState('');
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
        className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3 hover:border-gn1 focus:border-gn1"
        placeholder="어떤 여행지에 쉼표를 찍어볼까요?"
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
    </div>
  );
}
