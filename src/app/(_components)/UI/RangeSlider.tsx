'use client';

import { useEffect, useState } from 'react';

import { IFilter } from '@/app/(_utils)/type';
import { Range } from 'react-range';
import { v4 as uuidv4 } from 'uuid';

const MIN = 5;
const MAX = 24;
const STEP = 1;

interface RangeSliderProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

export default function RangeSlider({ filter, setFilter }: RangeSliderProps) {
  const [values, setValues] = useState([MIN, MAX]);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (filter.visitTime) {
      const [startStr, endStr] = filter.visitTime.split('-');
      const start = parseInt(startStr.split(':')[0], 10);
      const end = parseInt(endStr.split(':')[0], 10);
      setValues([start, end]);
      setIsTouched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isTouched) return;

    const [start, end] = values;
    const visitTimeStr = `${String(start).padStart(2, '0')}:00-${String(end).padStart(2, '0')}:00`;
    setFilter((prev) => ({ ...prev, visitTime: visitTimeStr }));
  }, [values, isTouched, setFilter]);

  return (
    <div className="w-full mt-[16px] mx-auto">
      <div className="flex justify-between mb-[4px] text-xs text-g3 tracking-[-0.02em]">
        <span>05:00</span>
        <span>14:30</span>
        <span>24:00~</span>
      </div>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(newValues) => {
          setValues(newValues);
          setIsTouched(true);
        }}
        renderTrack={({ props, children }) => (
          <div {...props} className="w-full h-[6px] rounded-full bg-gn4 border border-gn3 relative">
            <div
              className="absolute h-[6px] rounded-full bg-gn1"
              style={{
                left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div {...props} key={uuidv4()} className="relative flex flex-col items-center outline-none">
            <div className="h-[13px] w-[13px] bg-gn1 rounded-full shadow-md outline-none" key={uuidv4()} />
            {!(index === 0 && values[index] === MIN) && !(index === 1 && values[index] === MAX) && (
              <div className="absolute -top-8 flex flex-col items-center" key={uuidv4()}>
                <div className="p-[3px] text-xs font-semibold bg-gn1 text-white rounded-md">
                  {`${values[index]}:00`}
                </div>
                <div className="w-2 h-2 bg-gn1 rotate-45 mt-[-4px] rounded-[2px]"></div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
}
