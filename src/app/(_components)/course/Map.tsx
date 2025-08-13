'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import check from '/public/images/icons/check.svg';
import dynamic from 'next/dynamic';

const MapRender = dynamic(() => import('./MapRender'), {
  ssr: false,
});

interface MapProps {
  latitude: number;
  longitude: number;
  day: number;
}

export default function Map({ latitude, longitude, day }: MapProps) {
  const [checkedDays, setCheckedDays] = useState<boolean[]>([]);
  useEffect(() => {
    setCheckedDays(Array.from({ length: day }, () => false));
  }, [day]);

  const toggleCheck = (index: number) => {
    setCheckedDays((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <ul className="flex gap-[12px] justify-end">
        {Array.from({ length: day }, (_, i) => (
          <li key={i} className="flex items-center gap-[4px] font-[kkubulim] text-gn1 text-sm">
            <input
              id={`day-${i + 1}`}
              type="checkbox"
              checked={checkedDays[i] ?? false}
              onChange={() => toggleCheck(i)}
              className="peer hidden"
            />
            <label htmlFor={`day-${i + 1}`} className="flex items-center gap-1 cursor-pointer select-none">
              <span
                className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative flex-shrink-0"
                aria-hidden="true"
              >
                {checkedDays[i] && (
                  <Image className="absolute top-[4px] left-[4px]" src={check} alt="check" width={11} height={8} />
                )}
              </span>
              {i + 1}일
            </label>
          </li>
        ))}
      </ul>

      {latitude !== undefined && longitude !== undefined && <MapRender latitude={latitude} longitude={longitude} />}
    </>
  );
}
