import { IWeeklyWeather } from '@/app/(_utils)/type';
import RecommendTime from './RecommendTime';
import getWeeklyDate from '@/app/(_utils)/getWeeklyDate';

export default function WellnessItem({ weather }: { weather: IWeeklyWeather[] }) {
  const weekData = getWeeklyDate();

  return (
    <ul>
      {weekData.map(({ date, day }, idx) => (
        <li key={date} className="flex items-start justify-between border-b border-w6 py-[16px]">
          <div className="text-xs tracking-[-2%]">
            <p className="text-b1">{day}</p>
            <p className="text-g1">{date}</p>
          </div>
          <ul className="flex flex-col gap-[8px]">
            <RecommendTime weather={weather[idx]} />
            <RecommendTime weather={weather[idx]} />
            <RecommendTime weather={weather[idx]} />
          </ul>
        </li>
      ))}
    </ul>
  );
}
