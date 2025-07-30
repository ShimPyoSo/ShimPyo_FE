'use client';

import { useEffect, useState } from 'react';

import FilterItems from './FilterItem';
import { IFilter } from '@/app/(_utils)/type';
import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';

interface TimeFilterProps {
  selectedFilter: string | null;
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function TimeFilter({ selectedFilter, filterKey }: TimeFilterProps) {
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
        <p className="font-[kkubulim] text-lg text-gn1">주 운영 시간</p>
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
      {isExpanded && (
        <ul className="mt-[16px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
          {['아침', '낮', '저녁', '밤', '새벽'].map((area, index) => {
            const isSelected = selectedIndices.includes(index);
            return (
              <FilterItems
                isSelected={isSelected}
                index={index}
                name={area}
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
