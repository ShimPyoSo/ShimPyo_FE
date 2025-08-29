'use client';

import { ICourse, ICourseAddition } from '@/app/(_utils)/type';
import { SubmitHandler, useForm } from 'react-hook-form';

import CourseDate from './CourseDate';
import SpotSearchInput from './SpotSearchInput';

interface CourseSpotContentProps {
  course: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
  onClose: () => void;
}

export default function CourseSpotContent({ course, setCourse, onClose }: CourseSpotContentProps) {
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
    const updatedCourse: ICourse = { ...course };

    const targetDay = updatedCourse.days.find((day) => day.date === data.date);

    if (targetDay) {
      targetDay.list.push(data.course);

      targetDay.list.sort((a, b) => {
        if (!a.time || !b.time) return 0;
        return a.time.localeCompare(b.time);
      });
    } else {
      updatedCourse.days.push({
        date: data.date,
        list: [data.course],
      });
    }

    setCourse?.(updatedCourse);
    onClose();
  };

  return (
    <div className="pb-[40px] relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SpotSearchInput register={register} setValue={setValue} watch={watch} />
        <CourseDate register={register} watch={watch} />
        <section>
          <p className="mt-[52px] tracking-[-0.02em] text-g1 text-xs">시간 선택</p>
          <input
            className="mt-[12px] text-sm tracking-[-0.02em] text-b3 outline-none"
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
