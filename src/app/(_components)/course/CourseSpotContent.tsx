'use client';

import AnotherSpot from './AnotherSpot';
import CourseDate from './CourseDate';
import SpotRecommend from './SpotRecommend';
import SpotSearchInput from './SpotSearchInput';
import { useState } from 'react';

export default function CourseSpotContent() {
  const [selectedDay, setSelectedDay] = useState<number>(0);

  return (
    <div className="pb-[40px]">
      <SpotSearchInput />
      <SpotRecommend />
      <AnotherSpot />
      <CourseDate selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <section>
        <p className="mt-[52px] tracking-[-2%] text-g1 text-xs">시간 선택</p>
      </section>
    </div>
  );
}
