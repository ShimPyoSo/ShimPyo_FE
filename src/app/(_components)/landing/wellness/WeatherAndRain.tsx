'use client';

import Discomfort from './Discomfort';
import { IWeather } from '@/app/(_utils)/type';
import Image from 'next/image';
import cloudy from '/public/images/icons/wellness/weatherCloudy.svg';
import precipitation from '/public/images/icons/wellness/precipitation.svg';
import rain from '/public/images/icons/wellness/weatherRain.svg';
import snow from '/public/images/icons/wellness/weatherSnow.svg';
import sunny from '/public/images/icons/wellness/weatherSunny.svg';

interface WeatherAndRainProps {
  weather: IWeather;
}

export default function WeatherAndRain({ weather }: WeatherAndRainProps) {
  return (
    <>
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
          <Image
            src={
              weather.weather === '비' || weather.weather === '비/눈' || weather.weather === '소나기'
                ? rain
                : weather.weather === '눈'
                ? snow
                : weather.weather === '구름 많음' || weather.weather === '흐림'
                ? cloudy
                : sunny
            }
            alt="날씨"
            width={24}
            height={24}
          />
        </div>
        <p className="mt-[12px] text-g1 tracking-[-0.02em]">날씨</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-0.02em]">
          {weather.temperature ? `${weather.temperature}°` : '정보 없음'}
        </p>
      </li>
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
          <Image src={precipitation} alt="강수량" width={24} height={24} />
        </div>
        <p className="mt-[12px] text-g1 tracking-[-0.02em]">강수량</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-0.02em]">
          {weather.rainfall ? `${weather.rainfall}mm` : '정보 없음'}
        </p>
      </li>
      <Discomfort temperature={weather.temperature} humidity={weather.humidity} />
    </>
  );
}
