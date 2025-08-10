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
  weather: IWeeklyWeather;
}

export default function RecommendTime({ weather }: WellnessItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedImages = [bad, mid, rain, snow, sunny];

  return (
    <li>
      <div className="flex items-center rounded-lg bg-white px-[12px] py-[5px] tracking-[-2%]">
        <p className="text-xs text-g1">10:00</p>
        <div className="flex items-center ml-[38px]">
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
          <span className="ml-[6px] text-xs text-b3 flex">
            맑음<p className="font-semibold">&nbsp;{weather.maxTemp}°</p>
          </span>
        </div>
        <span className="mx-[6px] text-w6">|</span>
        <div className="flex items-center">
          <Image src={good} alt="번잡도" width={20} height={20} />
          <p className="ml-[4px] text-xs text-b3">매우 번잡</p>
        </div>
      </div>
    </li>
  );
}
