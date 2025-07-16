'use client';

import Image from 'next/image';
import cloudy from '/public/images/icons/wellness/weatherCloudy.svg';
import precipitation from '/public/images/icons/wellness/precipitation.svg';
import rain from '/public/images/icons/wellness/weatherRain.svg';
import snow from '/public/images/icons/wellness/weatherSnow.svg';
import sunny from '/public/images/icons/wellness/weatherSunny.svg';
import ultraviolet from '/public/images/icons/wellness/ultraviolet.svg';
import { useFetchWeather } from '@/app/(_utils)/hooks/useFetchWeather';

export default function WellnessFactor() {
  const { weather } = useFetchWeather();

  return (
    <ul className="mt-[16px] w-full flex items-center justify-between px-[10px] py-[20px] bg-gn11 rounded-xl">
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
        <p className="mt-[12px] text-g1 tracking-[-2%]">날씨</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">{weather.temperature}°</p>
      </li>
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
          <Image src={precipitation} alt="강수량" width={24} height={24} />
        </div>
        <p className="mt-[12px] text-g1 tracking-[-2%]">강수량</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">{weather.rainfall}mm</p>
      </li>
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center"></div>
        <p className="mt-[12px] text-g1 tracking-[-2%]">미세먼지</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">좋음</p>
      </li>
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
          <Image src={ultraviolet} alt="자외선" width={24} height={24} />
        </div>
        <p className="mt-[12px] text-g1 tracking-[-2%]">자외선지수</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">보통</p>
      </li>
      <li className="flex flex-col items-center text-xs">
        <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center"></div>
        <p className="mt-[12px] text-g1 tracking-[-2%]">번잡도</p>
        <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">낮음</p>
      </li>
    </ul>
  );
}
