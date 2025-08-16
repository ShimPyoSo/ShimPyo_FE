'use client';

import { useEffect, useState } from 'react';

import { IFilter } from '@/app/(_utils)/type';
import Image from 'next/image';
import RangeSlider from '../../UI/RangeSlider';
import arrow from '/public/images/icons/arrow.svg';

interface TimeFilterProps {
  selectedFilter: string | null;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function TimeFilter({ selectedFilter, filter, setFilter, filterItem }: TimeFilterProps) {
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
      <small className="text-g1 tracking-[-2%]">나의 스케줄에 딱 맞는 여행지를 찾아보세요</small>
      {isExpanded && <RangeSlider filter={filter} setFilter={setFilter} />}
    </section>
  );
}
