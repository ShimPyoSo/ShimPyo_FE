import DataSource from './DataSource';
import Image from 'next/image';
import WellnessItem from './WellnessItem';
import getWeeklyDate from '@/app/(_utils)/getWeeklyDate';
import illu from '/public/images/icons/illustration/wellness.svg';
import { useFetchConcentration } from '@/app/(_utils)/hooks/useFetchConcentration';
import { useFetchWeeklyWeather } from '@/app/(_utils)/hooks/useFetchWeeklyWeather';

interface WeeklyWellnessProps {
  latitude: number;
  longitude: number;
  address: string;
}

export default function WeeklyWellness({ longitude, latitude, address }: WeeklyWellnessProps) {
  const weekData = getWeeklyDate();
  const { weather } = useFetchWeeklyWeather({ longitude, latitude, address });
  const { concentration } = useFetchConcentration();

  return (
    <section>
      <div className="relative mb-[30px]">
        <Image src={illu} alt="이번주 웰니스" width={350} height={130} className="relative z-10" />
        <div className="absolute flex items-center bottom-[-30px] w-full bg-gn10 px-[12px] py-[12px] rounded-lg z-0">
          <WellnessItem
            date={weekData[0].date}
            day={weekData[0].day}
            weather={weather[0]}
            concentration={concentration[0]}
          />
        </div>
      </div>
      <ul>
        {weekData.slice(1).map(({ date, day }, idx) => (
          <li key={date} className="flex items-center border-b border-w6 px-[12px] py-[12px]">
            <WellnessItem date={date} day={day} weather={weather[idx + 1]} concentration={concentration[idx + 1]} />
          </li>
        ))}
      </ul>
      <DataSource />
    </section>
  );
}
