'use client';

import { ICourse, ICourseAddition, ICourseList } from '@/app/(_utils)/type';
import { SubmitHandler, useForm } from 'react-hook-form';

import CourseDate from './CourseDate';
import CourseTime from './CourseTime';
import SpotSearchInput from './SpotSearchInput';
import { useEffect } from 'react';

interface CourseSpotContentProps {
  course: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
  onClose: () => void;
  spot?: ICourseList;
  date?: string;
  idx?: number;
}

export default function CourseSpotContent({ course, setCourse, onClose, spot, date, idx }: CourseSpotContentProps) {
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

  useEffect(() => {
    if (date) {
      setValue('date', date);
    }
    if (spot) {
      setValue('course', spot);
    }
  }, [spot, date, setValue]);

  const selectedCourse = watch('course');

  const insertCourse = (updatedCourse: ICourse, data: ICourseAddition) => {
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
  };

  const onSubmit: SubmitHandler<ICourseAddition> = (data) => {
    const updatedCourse: ICourse = { ...course };

    if (spot && date !== undefined && idx !== undefined) {
      updatedCourse.days = updatedCourse.days.map((day) => {
        if (day.date === date) {
          return {
            ...day,
            list: day.list.filter((_, i) => i !== idx),
          };
        }
        return day;
      });
    }

    insertCourse(updatedCourse, data);

    setCourse?.(updatedCourse);
    onClose();
  };

  return (
    <div className="pb-[40px] relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SpotSearchInput register={register} setValue={setValue} watch={watch} />
        <CourseDate register={register} watch={watch} />
        <CourseTime register={register} />
        <button
          className={`fixed bottom-[20px] w-[343px] py-[16px] rounded-lg border font-semibold ${
            isValid && selectedCourse.touristId !== 0 ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
          }`}
        >
          {spot ? '여행지 수정하기' : '여행지 추가하기'}
        </button>
      </form>
    </div>
  );
}
