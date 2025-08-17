import CategoryTimeItem from './CategoryTimeItem';
import { ICourseList } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotItem from '../course/SpotItem';
import comma from '/public/images/icons/course/comma.svg';
import fullComma from '/public/images/icons/course/fullComma.svg';

interface DayItemProps {
  isEditable: boolean;
  day: string;
  course: ICourseList[];
}

export default function DayItem({ isEditable, day, course }: DayItemProps) {
  const dayNumber = parseInt(day, 10);

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
        {isEditable && (
          <button className="py-[6px] px-[10px] rounded-md bg-w2 border border-w1 text-b3 text-xs tracking-[-2%]">
            장소 추가하기
          </button>
        )}
      </div>
      <div className="pt-[28px] pb-[40px] border-b border-[#E2E2E2] flex items-start gap-[8px]">
        <ul>
          {course.map((spot, index) => (
            <CategoryTimeItem key={spot.touristId} isLast={index === course.length - 1} />
          ))}
        </ul>
        <ul className="flex flex-col gap-[18px]">
          {course.map((spot) => (
            <SpotItem key={spot.touristId} isEditable={isEditable} />
          ))}
        </ul>
      </div>
    </li>
  );
}
