import { IWeeklyWeather } from '@/app/(_utils)/type';
import Image from 'next/image';
import bad from '/public/images/icons/wellness/bustleBad.svg';
import cloudy from '/public/images/icons/wellness/weatherCloudy.svg';
import good from '/public/images/icons/wellness/bustleGood.svg';
import mid from '/public/images/icons/wellness/bustleMid.svg';
import no from '/public/images/icons/wellness/bustleNo.svg';
import rain from '/public/images/icons/wellness/weatherRain.svg';
import snow from '/public/images/icons/wellness/weatherSnow.svg';
import sunny from '/public/images/icons/wellness/weatherSunny.svg';

interface WellnessItemProps {
  date: string;
  day: string;
  weather: IWeeklyWeather;
  concentration: number;
}

export default function WellnessItem({ date, day, weather, concentration }: WellnessItemProps) {
  return (
    <>
      <div className="text-xs tracking-[-2%]">
        <p className="text-b1">{day}</p>
        <p className="text-g1">{date}</p>
      </div>
      <div className="ml-[24px] grow-1 flex items-center justify-between">
        <div className="px-[8px] py-[8px] flex items-center justify-between bg-white rounded-lg text-xs text-b3">
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
            width={20}
            height={20}
          />
          <div className="ml-[8px] flex items-center">
            <span className="flex items-center">
              최소<p className="text-bl font-semibold">&nbsp;{weather.minTemp}°</p>
            </span>
            <span className="mx-[4px] text-w6">|</span>
            <span className="flex items-center">
              최대 <p className="text-r font-semibold">&nbsp;{weather.maxTemp}°</p>
            </span>
          </div>
        </div>
        <div className="px-[8px] py-[8px] flex items-center justify-between bg-white rounded-lg text-xs text-b3">
          <Image
            src={concentration === -1 ? no : concentration < 40 ? good : concentration < 70 ? mid : bad}
            alt="집중률"
            width={20}
            height={20}
          />
          <span className="flex ml-[4px] text-xs text-b3">
            {concentration >= 0 ? (
              <span>
                집중률&nbsp;<p className="font-semibold">{concentration.toFixed(1)}%</p>
              </span>
            ) : (
              <p className="text-g3">정보 알 수 없음</p>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
