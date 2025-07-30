'use client';

import { useEffect, useState } from 'react';

import { IFilter } from '@/app/(_utils)/type';
import Image from 'next/image';
import TargetList from './TargetList';
import arrow from '/public/images/icons/arrow.svg';

interface TargetFilterProps {
  selectedFilter: string | null;
  filterKey: string;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function TargetFilter({ selectedFilter, filterKey }: TargetFilterProps) {
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
        <p className="font-[kkubulim] text-lg text-gn1">성별과 연령대</p>
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
      {isExpanded && <TargetList selectedIndices={selectedIndices} setSelectedIndices={setSelectedIndices} />}
    </section>
  );
}
