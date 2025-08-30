import CategoryTimeItem from './CategoryTimeItem';
import { ICourse } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotItem from '../course/SpotItem';
import comma from '/public/images/icons/course/comma.svg';
import fullComma from '/public/images/icons/course/fullComma.svg';

interface DayItemProps {
  isEditable: boolean;
  day: string;
  course: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
}

export default function DayItem({ isEditable, day, course, setCourse }: DayItemProps) {
  const dayNumber = parseInt(day, 10);
  const dayData = course.days.find((d) => d.date === day);
  const list = dayData?.list ?? [];

  return (
    <li className="mt-[42px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[3px]">
          <p className="font-[kkubulim] text-3xl text-gn1">{day}</p>
          <div className="flex items-center">
            {Array.from({ length: dayNumber }, (_, i) => (
              <Image key={i} src={i % 2 === 0 ? comma : fullComma} alt="쉼표" width={17} height={26} />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-[28px] pb-[40px] border-b border-[#E2E2E2] flex items-start gap-[8px]">
        <ul>
          {list.map((spot, index) => (
            <CategoryTimeItem key={spot.touristId} isLast={index === list.length - 1} time={spot.time as string} />
          ))}
        </ul>
        <ul className="flex flex-col gap-[18px]">
          {list.map((spot, idx) => (
            <SpotItem
              key={idx}
              isEditable={isEditable}
              isPreview={false}
              spot={spot}
              course={course}
              setCourse={setCourse}
              idx={idx}
              day={day}
            />
          ))}
        </ul>
      </div>
    </li>
  );
}
