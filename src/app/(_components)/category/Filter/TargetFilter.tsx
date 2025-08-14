'use client';

import { useEffect, useState } from 'react';

import { IFilter } from '@/app/(_utils)/type';
import Image from 'next/image';
import TargetList from './TargetList';
import arrow from '/public/images/icons/arrow.svg';

interface TargetFilterProps {
  selectedFilter: string | null;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function TargetFilter({ selectedFilter, filterItem, setFilter, filter }: TargetFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedFilter === filterItem.label) {
      setIsExpanded(true);
    }
  }, [selectedFilter, filterItem]);

  return (
    <section className="py-[25px] border-b border-w5">
      <div className="flex items-center justify-between">
        <p className="font-[kkubulim] text-lg text-gn1">{filterItem.label}</p>
        <Image
          className={`${isExpanded ? '' : 'rotate-180'}`}
          src={arrow}
          alt="더보기"
          width={24}
          height={24}
          role="button"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <small className="text-g1 tracking-[-2%]">나의 친구들이 자주 방문하는 여행지를 찾아보세요</small>
      {isExpanded && <TargetList setFilter={setFilter} filter={filter} filterItem={filterItem} />}
    </section>
  );
}
