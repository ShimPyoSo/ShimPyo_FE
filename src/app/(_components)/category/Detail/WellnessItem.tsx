import RecommendTime from './RecommendTime';
import getWeeklyDate from '@/app/(_utils)/getWeeklyDate';
import { useFetchWeeklyWeather } from '@/app/(_utils)/hooks/useFetchWeeklyWeather';

export default function WellnessItem() {
  const weekData = getWeeklyDate();
  const { weather } = useFetchWeeklyWeather();

  return (
    <ul>
      {weekData.map(({ date, day }, idx) => (
        <li key={date} className="flex items-start justify-between border-b border-w6 py-[16px]">
          <div className="text-xs tracking-[-2%]">
            <p className="text-b1">{day}</p>
            <p className="text-g1">{date}</p>
          </div>
          <ul className="flex flex-col gap-[8px]">
            <RecommendTime weather={weather[idx + 1]} />
            <RecommendTime weather={weather[idx + 1]} />
            <RecommendTime weather={weather[idx + 1]} />
          </ul>
        </li>
      ))}
    </ul>
  );
}
