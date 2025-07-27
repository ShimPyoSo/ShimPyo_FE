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
    </ul>
  );
}
