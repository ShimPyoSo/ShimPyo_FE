'use client';

import { useEffect, useState } from 'react';

import FineDust from './FineDust';
import { ILocation } from '@/app/(_utils)/type';
import UltraViolet from './UltraViolet';
import WeatherAndRain from './WeatherAndRain';
import WellnessScore from './WellnessScore';
import { calculateWellnessScore } from '@/app/(_utils)/getWellnessScore';
import { useFetchDust } from '@/app/(_utils)/hooks/useFetchDust';
import { useFetchUltraViolet } from '@/app/(_utils)/hooks/useFetchUltraViolet';
import { useFetchWeather } from '@/app/(_utils)/hooks/useFetchWeather';

interface WellnessFactorProps {
  location: ILocation | null;
}

export default function WellnessFactor({ location }: WellnessFactorProps) {
  const { weather } = useFetchWeather();
  const { dust } = useFetchDust(location);
  const { ultraviolet } = useFetchUltraViolet();
  const [score, setScore] = useState(100);

  useEffect(() => {
    if (dust && ultraviolet && weather) {
      const result = calculateWellnessScore({ weather, dust, ultraviolet });
      setScore(result);
    }
  }, [dust, weather, ultraviolet]);

  return (
    <>
      <WellnessScore score={score} />
      <ul className="mt-[56px] w-full flex items-center justify-between px-[10px] py-[20px] bg-gn11 rounded-xl">
        <WeatherAndRain weather={weather} />
        <FineDust dust={dust} />
        <UltraViolet ultraviolet={ultraviolet} />
      </ul>
    </>
  );
}
