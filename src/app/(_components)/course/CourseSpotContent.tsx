'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import CourseDate from './CourseDate';
import { ICourseAddition } from '@/app/(_utils)/type';
import SpotSearchInput from './SpotSearchInput';

export default function CourseSpotContent() {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<ICourseAddition>({
    defaultValues: {
      date: '1일',
      course: {
        touristId: 0,
      },
    },
  });

  const selectedCourse = watch('course');

  const onSubmit: SubmitHandler<ICourseAddition> = (data) => {
    console.log('form data:', data);
  };

  return (
    <div className="pb-[40px] relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SpotSearchInput register={register} setValue={setValue} watch={watch} />
        <CourseDate register={register} watch={watch} />
        <section>
          <p className="mt-[52px] tracking-[-2%] text-g1 text-xs">시간 선택</p>
          <input
            className="mt-[12px] text-sm tracking-[-2%] text-b3 outline-none"
            type="time"
            {...register('course.time', { required: '시간을 선택해주세요' })}
          />
        </section>
        <button
          className={`fixed bottom-[20px] w-[343px] py-[16px] rounded-lg border font-semibold ${
            isValid && selectedCourse.touristId !== 0 ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
          }`}
        >
          여행지 추가하기
        </button>
      </form>
    </div>
  );
}
