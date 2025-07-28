'use client';

import FilterBottomSheet from './FilterBottomSheet';
import FilterContent from './FilterContent';
import FilterList from './FilterList';
import { IFilter } from '@/app/(_utils)/type';
import { useState } from 'react';

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null); // 최초 클릭된 필터
  const [filter, setFilter] = useState<IFilter>({
    region: [],
    type: [],
    reservation: [],
    service: [],
    target: [],
    time: [],
  }); // 선택한 필터 옵션

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFilter(null);
  };

  return (
    <>
      <FilterList setIsOpen={setIsOpen} setSelectedFilter={setSelectedFilter} filter={filter} />
      <FilterBottomSheet isOpen={isOpen} onClose={handleClose}>
        <FilterContent selectedFilter={selectedFilter} setFilter={setFilter} />
      </FilterBottomSheet>
    </>
  );
}
