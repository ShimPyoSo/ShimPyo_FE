'use client';

import FilterBottomSheet from './FilterBottomSheet';
import FilterContent from './FilterContent';
import FilterList from './FilterList';
import { useState } from 'react';

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFilter(null);
  };

  return (
    <>
      <FilterList setIsOpen={setIsOpen} setSelectedFilter={setSelectedFilter} />
      <FilterBottomSheet isOpen={isOpen} onClose={handleClose}>
        <FilterContent selectedFilter={selectedFilter} />
      </FilterBottomSheet>
    </>
  );
}
