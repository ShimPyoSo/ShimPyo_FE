import { IWeeklyWeather } from '@/app/(_utils)/type';
import Image from 'next/image';
import bad from '/public/images/icons/wellness/bustleBad.svg';
import cloudy from '/public/images/icons/wellness/weatherCloudy.svg';
import good from '/public/images/icons/wellness/bustleGood.svg';
import mid from '/public/images/icons/wellness/bustleMid.svg';
import rain from '/public/images/icons/wellness/weatherRain.svg';
import snow from '/public/images/icons/wellness/weatherSnow.svg';
import sunny from '/public/images/icons/wellness/weatherSunny.svg';

interface WellnessItemProps {
  date: string;
  day: string;
  weather: IWeeklyWeather;
}

export default function WellnessItem({ date, day, weather }: WellnessItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedImages = [bad, mid, rain, snow, sunny];

  return (
    <>
      <div className="text-xs tracking-[-2%]">
        <p className="text-b1">{day}</p>
        <p className="text-g1">{date}</p>
      </div>
      <div className="grow-1 flex items-center justify-between">
        <div className="px-[8px] py-[8px] ml-[24px] flex items-center justify-between bg-white rounded-lg text-xs text-b3">
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
              최소<p className="text-b font-semibold">&nbsp;{weather.minTemp}°</p>
            </span>
            <span className="mx-[4px] text-w6">|</span>
            <span className="flex items-center">
              최대 <p className="text-r font-semibold">&nbsp;{weather.maxTemp}°</p>
            </span>
          </div>
        </div>
        <div className="px-[8px] py-[8px] flex items-center justify-between bg-white rounded-lg text-xs text-b3">
          <Image src={good} alt="번잡도" width={20} height={20} />
          <p className="ml-[4px] text-xs text-b3">매우 번잡해요</p>
        </div>
      </div>
    </>
  );
}
