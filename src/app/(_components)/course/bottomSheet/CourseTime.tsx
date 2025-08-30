'use client';

import { ICourseAddition } from '@/app/(_utils)/type';
import { UseFormRegister } from 'react-hook-form';

interface CourseSpotContentProps {
  register: UseFormRegister<ICourseAddition>;
}

export default function CourseTime({ register }: CourseSpotContentProps) {
  return (
    <section>
      <p className="mt-[52px] tracking-[-0.02em] text-g1 text-xs">시간 선택</p>
      <input
        className="mt-[12px] text-sm tracking-[-0.02em] text-b3 outline-none"
        type="time"
        {...register('course.time', { required: '시간을 선택해주세요' })}
      />
    </section>
  );
}
