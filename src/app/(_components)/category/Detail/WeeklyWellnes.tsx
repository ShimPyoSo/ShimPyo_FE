'use client';

import Image from 'next/image';
import WellnessItem from './WellnessItem';
import getWeeklyDate from '@/app/(_utils)/getWeeklyDate';
import illu from '/public/images/icons/illustration/wellness.svg';
import { useFetchWeeklyWeather } from '@/app/(_utils)/hooks/useFetchWeeklyWeather';

export default function WeeklyWellness() {
  const weekData = getWeeklyDate();
  useFetchWeeklyWeather();

  return (
    <section>
      <div className="relative mb-[30px]">
        <Image src={illu} alt="이번주 웰니스" width={350} height={130} className="relative z-10" />
        <div className="absolute flex items-center bottom-[-30px] w-full bg-gn10 px-[12px] py-[12px] rounded-lg z-0">
          <WellnessItem date={weekData[0].date} day={weekData[0].day} />
        </div>
      </div>
      <ul>
        {weekData.slice(1).map(({ date, day }) => (
          <li key={date} className="flex items-center border-b border-w6 px-[12px] py-[12px]">
            <WellnessItem date={date} day={day} />
          </li>
        ))}
      </ul>
    </section>
  );
}
