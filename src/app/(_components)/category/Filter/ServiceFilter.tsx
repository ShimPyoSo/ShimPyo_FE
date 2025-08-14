'use client';

import { FACILITIES, IFilter } from '@/app/(_utils)/type';
import { useEffect, useState } from 'react';

import FilterItems from './FilterItem';
import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';

interface ServiceFilterProps {
  selectedFilter: string | null;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function ServiceFilter({ selectedFilter, filterItem, filter, setFilter }: ServiceFilterProps) {
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
      <small className="text-g1 tracking-[-2%]">보다 편리한 여행을 위한 제공 서비스를 선택해 보세요</small>
      {isExpanded && (
        <ul className="mt-[16px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
          {filterItem.key === 'facilities' &&
            FACILITIES.map((area, idx) => {
              const isSelected = filter.facilities.includes(area.value);
              return (
                <FilterItems
                  isSelected={isSelected}
                  name={area.label}
                  key={idx}
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
