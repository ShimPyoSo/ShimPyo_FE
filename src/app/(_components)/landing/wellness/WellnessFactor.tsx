'use client';

import FineDust from './FineDust';
import { ILocation } from '@/app/(_utils)/type';
import UltraViolet from './UltraViolet';
import WeatherAndRain from './WeatherAndRain';

interface WellnessFactorProps {
  location: ILocation | null;
}

export default function WellnessFactor({ location }: WellnessFactorProps) {
  return (
    <ul className="mt-[16px] w-full flex items-center justify-between px-[10px] py-[20px] bg-gn11 rounded-xl">
      <WeatherAndRain />
      <FineDust location={location} />
      <UltraViolet />
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center"></div>
        <p className="mt-[12px] text-g1 tracking-[-2%]">번잡도</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">낮음</p>
      </li>
    </ul>
  );
}
