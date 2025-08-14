'use client';

import { useEffect, useState } from 'react';

import FilterItems from './FilterItem';
import { IFilter } from '@/app/(_utils)/type';
import Image from 'next/image';
import { REGIONS } from '@/app/(_utils)/type';
import arrow from '/public/images/icons/arrow.svg';

interface AreaFilterProps {
  selectedFilter: string | null;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function AreaFilter({ selectedFilter, filter, setFilter, filterItem }: AreaFilterProps) {
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
      <small className="text-g1 tracking-[-2%]">여행을 희망하는 지역을 모두 선택해 보세요</small>
      {isExpanded && (
        <ul className="mt-[16px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
          {filterItem.key === 'region' &&
            REGIONS.map((area) => {
              const isSelected = filter.region.includes(area.value);
              return (
                <FilterItems
                  isSelected={isSelected}
                  name={area.label}
                  key={area.value}
                  setFilter={setFilter}
                  filterItem={filterItem}
                />
              );
            })}
        </ul>
      )}
    </section>
  );
}
