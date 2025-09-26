import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { ICourseAddition } from '@/app/(_utils)/type';
import Image from 'next/image';
import check from '/public/images/icons/check.svg';

interface CourseDateProps {
  isFixed: boolean;
  duration: number;
  register: UseFormRegister<ICourseAddition>;
  watch: UseFormWatch<ICourseAddition>;
}

export default function CourseDate({ isFixed, duration, register, watch }: CourseDateProps) {
  const selectedDate = watch('date');

  return (
    <section>
      <p className="mt-[52px] tracking-[-0.02em] text-g1 text-xs">날짜 선택</p>
      <ul className="mt-[12px] flex gap-[12px] items-center">
        {Array.from({ length: isFixed ? duration : duration + 1 }, (_, i) => {
          const dayValue = `${i + 1}일`;
          return (
            <li key={i} className="flex items-center gap-[4px] tracking-[-0.02em] text-b3 text-sm">
              <label htmlFor={`day-${dayValue}`} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id={`day-${dayValue}`}
                  type="radio"
                  value={dayValue}
                  {...register('date')}
                  className="peer hidden"
                />
                <span
                  className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative flex-shrink-0"
                  aria-hidden="true"
                >
                  {selectedDate === dayValue && (
                    <Image className="absolute top-[4px] left-[4px]" src={check} alt="check" width={11} height={8} />
                  )}
                </span>
                {dayValue}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
