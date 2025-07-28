'use client';

import { useEffect, useState } from 'react';

import FilterItems from './FilterItem';
import { IFilter } from '@/app/(_utils)/type';
import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';

interface ReservationFilterProps {
  selectedFilter: string | null;
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function ReservationFilter({ selectedFilter, filterKey }: ReservationFilterProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedFilter === filterKey) {
      setIsExpanded(true);
    }
  }, [selectedFilter, filterKey]);

  return (
    <section className="py-[25px] border-b border-w5">
      <div className="flex items-center justify-between">
        <p className="font-[kkubulim] text-lg text-gn1">예약</p>
        <Image
          className={`${isExpanded ? 'rotate-180' : ''}`}
          src={arrow}
          alt="더보기"
          width={24}
          height={24}
          role="button"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <small className="text-g1 tracking-[-2%]">예약 가능 여부를 선택해 보세요</small>
      {isExpanded && (
        <ul className="mt-[16px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
          {['가능', '불가능'].map((type, index) => {
            const isSelected = selectedIndices.includes(index);
            return (
              <FilterItems
                isSelected={isSelected}
                index={index}
                name={type}
                key={index}
                setSelectedIndices={setSelectedIndices}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
}
