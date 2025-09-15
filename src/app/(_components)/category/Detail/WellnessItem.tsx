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
  isDayOff: boolean;
  type: 'detail' | 'course';
}

export default function WellnessItem({ date, day, weather, concentration, isDayOff, type }: WellnessItemProps) {
  return (
    <>
      <div className="text-xs tracking-[-0.02em]">
        <p className="text-b1">{day}</p>
        <p className="text-g1">{date}</p>
      </div>
      {isDayOff ? (
        <div className="grow flex items-center justify-end">
          <p className={`font-semibold tracking-[-0.02em] text-xs ${day === '오늘' ? 'text-b1' : 'text-g3'}`}>
            해당 날짜는 관광지 휴무일이예요
          </p>
        </div>
      ) : (
        <div className={`${type === 'detail' ? 'ml-[24px]' : 'ml-[16px]'} grow-1 flex items-center justify-between`}>
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
                {type === 'detail' && '최저'}
                <p className="text-bl font-semibold">&nbsp;{weather.minTemp}°</p>
              </span>
              <span className="mx-[4px] text-w6">|</span>
              <span className="flex items-center">
                {type === 'detail' && '최고'}
                <p className="text-r font-semibold">&nbsp;{weather.maxTemp}°</p>
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
                <span className="flex items-center">
                  집중률&nbsp;
                  <p className="font-semibold">
                    {Number.isInteger(concentration) ? concentration : concentration.toFixed(1)}%
                  </p>
                </span>
              ) : (
                <p className="text-g3">정보 미제공</p>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
