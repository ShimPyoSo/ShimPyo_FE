'use client';

import { useEffect, useState } from 'react';

import WordItem from './WordItem';
import axios from 'axios';

interface SearchInputProps {
  isActive: boolean;
  query: string;
}

export default function AutoComplete({ isActive, query }: SearchInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`/autocomplete?word=${encodeURIComponent(query)}`);
        setSuggestions(res.data.suggestions || []);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <ul className="absolute top-[68px] w-full h-[212px] bg-white rounded-lg overflow-y-auto shadow-[0px_6px_20px_0px_#00000014]">
      {suggestions.map((word, idx) => {
        return <WordItem isActive={isActive} searchWord={word} key={idx} />;
      })}
    </ul>
  );
}
