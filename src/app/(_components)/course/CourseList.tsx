'use client';

import { ICourse, ILatLng } from '@/app/(_utils)/type';
import { useEffect, useState } from 'react';

import AddSpot from './bottomSheet/AddSpot';
import CourseDelete from './CourseDelete';
import CourseTitle from './CourseTitle';
import DayItem from './DayItem';
import Map from './Map';
import Share from '../UI/Share';
import { testImages } from '@/app/(_utils)/constants';
import { useParams } from 'next/navigation';

interface CourseListProps {
  isEditable: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  course: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
  setTitleLength?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseList({ isEditable, setIsOpen, course, setCourse, setTitleLength }: CourseListProps) {
  const { id } = useParams();
  const [title, setTitle] = useState(course.title);

  useEffect(() => {
    if (course) setTitle(course.title);
  }, [course]);

  const currentItem = testImages.find((item) => item.name === course.typename);
  if (!currentItem) return null;

  const positionsGroup: ILatLng[][] = course.days.map((day) =>
    day.list.map((spot) => ({
      latitude: spot.latitude,
      longitude: spot.longitude,
    }))
  );

  const idGroup: number[][] = course.days.map((day) => day.list.map((spot) => spot.touristId));

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
          <CourseTitle
            title={title}
            setTitle={setTitle}
            course={course}
            isEditable={isEditable}
            setTitleLength={setTitleLength}
          />
        </h2>
        <div className="flex gap-[6px] items-center">
          <Share setIsOpen={setIsOpen} type="course" courseId={course.courseId} token={course.token} />
          {isEditable && <CourseDelete courseId={Number(id as string)} type="detail" />}
        </div>
      </div>
      <Map positions={positionsGroup} day={course.days.length} ids={ids} />
      {isEditable && <AddSpot setCourse={setCourse} course={course} />}
      <ul className={`${isEditable ? '' : 'mt-[42px]'} pb-[72px]`}>
        {course.days.map((day, index) => (
          <DayItem
            key={index}
            day={day.date}
            course={course}
            setCourse={setCourse}
            isEditable={isEditable}
            idx={index}
          />
        ))}
      </ul>
    </>
  );
}
