'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';

interface TimeFilterProps {
  selectedFilter: string | null;
  filterKey: string;
}

export default function TimeFilter({ selectedFilter, filterKey }: TimeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedFilter === filterKey) {
      setIsExpanded(true);
    }
  }, [selectedFilter, filterKey]);

  return (
    <section className="py-[25px] border-b border-w5">
      <div className="flex items-center justify-between">
        <p className="font-[kkubulim] text-lg text-gn1">소요 시간</p>
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
      <small className="text-g1 tracking-[-2%]">여행지에서 보내고 싶은 시간 만큼 움직여 보세요</small>
      {isExpanded && <></>}
    </section>
  );
}
