import { IWeeklyWeather } from '@/app/(_utils)/type';
import Image from 'next/image';
import cloudy from '/public/images/icons/wellness/weatherCloudy.svg';
import rain from '/public/images/icons/wellness/weatherRain.svg';
import snow from '/public/images/icons/wellness/weatherSnow.svg';
import sunny from '/public/images/icons/wellness/weatherSunny.svg';

export default function TodayWeather({ weather }: { weather: IWeeklyWeather[] }) {
  const now = new Date();
  const currentHour = now.getHours();
  return (
    <div className="mt-[32px] w-full h-[208px] p-[10px] bg-white rounded-xl border border-w4">
      <p className="tracking-[-2%] font-semibold text-b1 text-sm">오늘의 날씨</p>
      <div className="mx-auto">
        <p className="text-xs text-g1 tracking-[-2%]">지금</p>
        <Image
          src={
            weather[currentHour].weather === '비' ||
            weather[currentHour].weather === '비/눈' ||
            weather[currentHour].weather === '소나기'
              ? rain
              : weather[currentHour].weather === '눈'
              ? snow
              : weather[currentHour].weather === '구름 많음' || weather[currentHour].weather === '흐림'
              ? cloudy
              : sunny
          }
          alt="날씨"
          width={40}
          height={40}
        />
        <p className="font-semibold text-b3">{weather[currentHour].temp}°</p>
      </div>
    </div>
  );
}
