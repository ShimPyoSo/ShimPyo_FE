'use client';

import SearchInput from '@/app/(_components)/search/SearchInput';
import SearchResultList from '@/app/(_components)/search/SearchResultList';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function SearchResult() {
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('여행지 찾기');
  }, [setTitle]);

  return (
    <div className="min-h-full bg-w1">
      <div className="px-[16px]">
        <SearchInput />
      </div>
      <SearchResultList />
    </div>
  );
}
