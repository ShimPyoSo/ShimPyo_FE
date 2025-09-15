'use client';

import { ICourseAddition } from '@/app/(_utils)/type';
import { UseFormRegister } from 'react-hook-form';

interface CourseSpotContentProps {
  register: UseFormRegister<ICourseAddition>;
}

export default function CourseTime({ register }: CourseSpotContentProps) {
  return (
    <section className=" mb-[80px]">
      <p className="mt-[52px] tracking-[-0.02em] text-g1 text-xs">시간 선택</p>
      <input
        type="time"
        defaultValue="12:00"
        {...register('course.time', { required: '시간을 선택해주세요' })}
        className="mt-[12px] rounded-xl border border-w4 bg-white px-3 py-2 text-sm tracking-[-0.02em] text-b3 outline-none"
      />
    </section>
  );
}
