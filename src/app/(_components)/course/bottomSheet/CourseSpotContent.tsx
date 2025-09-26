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
  const { handleSubmit, register, setValue, watch } = useForm<ICourseAddition>({
    defaultValues: {
      date: '1일',
      course: {
        touristId: 0,
        time: '12:00',
      },
    },
  });
  const selectedDate = watch('date');
  const selectedTime = watch('course.time');

  useEffect(() => {
    if (date) {
      setValue('date', date);
    }
    if (spot) {
      setValue('course', {
        ...spot,
        time: spot.time || '12:00',
      });
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
    const updatedCourse: ICourse = JSON.parse(JSON.stringify(course));

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
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SpotSearchInput register={register} setValue={setValue} watch={watch} />
        <CourseDate
          isFixed={!!(course && course.duration !== null)}
          duration={course.days.length}
          register={register}
          watch={watch}
        />
        <CourseTime register={register} />
        {selectedDate && selectedTime && selectedCourse.touristId !== 0 && (
          <div className="sticky bottom-[20px] flex justify-center z-[999]">
            <button className={`w-[343px] py-[16px] border font-semibold rounded-lg bg-gn1 border-gn5 text-white`}>
              {spot ? '여행지 수정하기' : '여행지 추가하기'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
