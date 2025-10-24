'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import WordItem from './WordItem';
import axios from 'axios';
import noSuggestions from '/public/images/noSuggestions.svg';

interface SearchInputProps {
  isActive: boolean;
  query: string;
  type: 'search' | 'addition';
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export default function AutoComplete({ isActive, query, type, setQuery }: SearchInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/autocomplete?word=${encodeURIComponent(query)}`
        );
        setSuggestions(res.data || []);
      } catch {
        // 에러 추후 추가
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <ul
      className={`absolute top-[68px] w-full h-[212px] bg-white rounded-lg overflow-y-auto shadow-[0px_6px_20px_0px_#00000014] ${
        suggestions.length === 0 ? 'flex items-center justify-center' : ''
      }`}
    >
      {suggestions.length === 0 ? (
        <li className="flex flex-col items-center justify-center">
          <Image src={noSuggestions} alt="결과없음" width={44} height={70} />
          <p className="mt-[12px] text-sm text-b3 tracking-[-0.013em]">관련 검색어가 없어요</p>
        </li>
      ) : (
        suggestions.map((word, idx) => (
          <WordItem isActive={isActive} searchWord={word} key={idx} type={type} setQuery={setQuery} />
        ))
      )}
    </ul>
  );
}
