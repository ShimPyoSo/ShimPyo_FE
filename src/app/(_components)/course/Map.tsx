'use client';

import { useEffect, useState } from 'react';

import { ILatLng } from '@/app/(_utils)/type';
import Image from 'next/image';
import check from '/public/images/icons/check.svg';
import dynamic from 'next/dynamic';

const MapRender = dynamic(() => import('./MapRender'), {
  ssr: false,
});

interface MapProps {
  positions: ILatLng[][];
  titles: string[][];
  day: number;
}

export default function Map({ positions, titles, day }: MapProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    setSelectedDay(day > 0 ? 0 : null);
  }, [day]);

  const onSelectDay = (index: number) => {
    setSelectedDay(index);
  };

  return (
    <>
      <ul className="flex gap-[12px] justify-end">
        {Array.from({ length: day }, (_, i) => (
          <li key={i} className="flex items-center gap-[4px] font-[kkubulim] text-gn1 text-sm">
            <label htmlFor={`day-${i + 1}`} className="flex items-center gap-1 cursor-pointer select-none">
              <input
                id={`day-${i + 1}`}
                type="radio"
                name="day-select"
                checked={selectedDay === i}
                onChange={() => onSelectDay(i)}
                className="peer hidden"
              />
              <span
                className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative flex-shrink-0"
                aria-hidden="true"
              >
                {selectedDay === i && (
                  <Image className="absolute top-[4px] left-[4px]" src={check} alt="check" width={11} height={8} />
                )}
              </span>
              {i + 1}일
            </label>
          </li>
        ))}
      </ul>

      {selectedDay !== null && positions && (
        <MapRender positions={positions[selectedDay]} titles={titles[selectedDay]} day={selectedDay} />
      )}
    </>
  );
}
