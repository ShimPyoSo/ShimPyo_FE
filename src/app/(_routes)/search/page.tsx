'use client';

import { useEffect, useState } from 'react';

import Recommend from '@/app/(_components)/landing/Recommend';
import SearchHistory from '@/app/(_components)/search/SearchHistory';
import SearchInput from '@/app/(_components)/search/SearchInput';

export default function Search() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const isStoreActive = localStorage.getItem('shimpyo_history');
    if (isStoreActive === 'false') setIsActive(false);
  }, []);

  return (
    <div className="min-h-full bg-w1 px-[16px]">
      <SearchInput isActive={isActive} />
      <SearchHistory isActive={isActive} setIsActive={setIsActive} />
      <Recommend />
    </div>
  );
}
