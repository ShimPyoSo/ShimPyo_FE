'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import CourseDate from './CourseDate';
import { ICourseAddition } from '@/app/(_utils)/type';
import SpotSearchInput from './SpotSearchInput';

export default function CourseSpotContent() {
  const { handleSubmit, register, setValue, watch } = useForm<ICourseAddition>();

  const onSubmit: SubmitHandler<ICourseAddition> = (data) => {
    console.log('form data:', data);
  };

  return (
    <div className="pb-[40px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SpotSearchInput register={register} setValue={setValue} watch={watch} />
        <CourseDate register={register} watch={watch} />
        <section>
          <p className="mt-[52px] tracking-[-2%] text-g1 text-xs">시간 선택</p>
        </section>
      </form>
    </div>
  );
}
