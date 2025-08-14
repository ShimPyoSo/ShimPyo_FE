'use client';

import { useEffect, useState } from 'react';

import Filter from '@/app/(_components)/category/Filter/Filter';
import { IFilter } from '@/app/(_utils)/type';
import NoResult from '@/app/(_components)/search/NoResult';
import SearchInput from '@/app/(_components)/search/SearchInput';
import SpotListItem from '@/app/(_components)/category/SpotListItem';

export default function SearchResult() {
  const [isActive, setIsActive] = useState(true);
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    reservation: [],
    facilities: [],
    target: [[], []],
    visitTime: '',
  }); // 선택한 필터 옵션

  useEffect(() => {
    const isStoreActive = localStorage.getItem('shimpyo_history');
    if (isStoreActive === 'false') setIsActive(false);
  }, []);

  return (
    <div className="min-h-full bg-w1">
      <div className="px-[16px]">
        <SearchInput isActive={isActive} />
      </div>

      {true && <Filter filter={filter} setFilter={setFilter} />}
      {true ? (
        <ul className="px-[16px] pb-[20px] flex-1 overflow-y-auto">
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
          <SpotListItem type="spot" />
        </ul>
      ) : (
        <NoResult />
      )}
    </div>
  );
}
