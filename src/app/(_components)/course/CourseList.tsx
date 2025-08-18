'use client';

import { ICourse, ILatLng } from '@/app/(_utils)/type';

import DayItem from './DayItem';
import Image from 'next/image';
import Map from './Map';
import Share from '../UI/Share';
import { testImages } from '@/app/(_utils)/constants';
import trash from '/public/images/icons/course/trash.svg';

interface CourseListProps {
  isEditable: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  course: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
}

export default function CourseList({ isEditable, setIsOpen, course }: CourseListProps) {
  const currentItem = testImages.find((item) => item.name === course.typename);
  if (!currentItem) return null;

  const positionsGroup: ILatLng[][] = course.days.map((day) =>
    day.list.map((spot) => ({
      latitude: spot.latitude,
      longitude: spot.longitude,
    }))
  );

  const titlesGroup: string[][] = course.days.map((day) => day.list.map((spot) => spot.title));

  return (
    <>
      <div className="mt-[30px] mb-[24px] flex items-end justify-between">
        <h2>
          <p
            className="font-[kkubulim] text-sm"
            style={{
              color: currentItem.color,
            }}
          >
            {course.typename}
          </p>
          <p className="font-semibold text-lg text-b1">{course.title}</p>
        </h2>
        <div className="flex gap-[6px] items-center">
          <Share setIsOpen={setIsOpen} type="course" courseId={course.courseId} token={course.token} />
          {isEditable && (
            <button>
              <Image src={trash} alt="삭제" width={24} height={24} />
            </button>
          )}
        </div>
      </div>
      <Map positions={positionsGroup} titles={titlesGroup} day={course.days.length} />
      <ul className="pb-[72px]">
        {course.days.map((day, index) => (
          <DayItem key={index} day={day.date} course={day.list} isEditable={isEditable} />
        ))}
      </ul>
    </>
  );
}
