'use client';

import { IFilter, RESERVATION_STATUS } from '@/app/(_utils)/type';
import { useEffect, useState } from 'react';

import FilterItems from './FilterItem';
import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';

interface ReservationFilterProps {
  selectedFilter: string | null;
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  filterItem: { label: string; key: keyof IFilter };
}

export default function ReservationFilter({ selectedFilter, filter, setFilter, filterItem }: ReservationFilterProps) {
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
      <small className="text-g1 tracking-[-2%]">예약 가능 여부를 선택해 보세요</small>
      {isExpanded && (
        <ul className="mt-[16px] flex gap-x-[4px] gap-y-[8px] flex-wrap">
          {filterItem.key === 'reservation' &&
            RESERVATION_STATUS.map((area, idx) => {
              const isSelected = filter.reservation.includes(area.value);
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
