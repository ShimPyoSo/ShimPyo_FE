'use client';

import FilterBottomSheet from './FilterBottomSheet';
import FilterContent from './FilterContent';
import FilterList from './FilterList';
import { IFilter } from '@/app/(_utils)/type';
import { useState } from 'react';

interface FilterProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function Filter({ filter, setFilter }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null); // 최초 클릭된 필터

  const filterItems: { label: string; key: keyof IFilter }[] = [
    { label: '여행 지역', key: 'region' },
    { label: '운영 시간', key: 'visitTime' },
    { label: '제공 서비스', key: 'facilities' },
    { label: '성별과 연령대', key: 'target' },
  ];

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFilter(null);
  };

  return (
    <>
      <FilterList
        setIsOpen={setIsOpen}
        setSelectedFilter={setSelectedFilter}
        filter={filter}
        filterItem={filterItems}
      />
      <FilterBottomSheet isOpen={isOpen} onClose={handleClose}>
        <FilterContent selectedFilter={selectedFilter} filter={filter} setFilter={setFilter} filterItem={filterItems} />
      </FilterBottomSheet>
    </>
  );
}
