'use client';

import Image from 'next/image';
import Link from 'next/link';
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
    <section className="mt-[30px]">
      <h2 className="font-[kkubulim] text-gn1 text-xl">여행지 찾기</h2>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mt-[12px] mb-[8px] w-full bg-white rounded-lg border border-w4 text-sm py-[12px] px-[16px] outline-none placeholder:text-g3"
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

      <span className="flex gap-[16px] tracking-[-2%] text-xs">
        <p className="text-b3 font-semibold">추천 검색어</p>
        <ul className="text-g1 flex gap-[8px]">
          {['템플스테이', '요가', '촌캉스', '스파', '비건'].map((keyword) => (
            <li key={keyword}>
              <Link href={`/search/${keyword}`}>{keyword}</Link>
            </li>
          ))}
        </ul>
      </span>
    </section>
  );
}
