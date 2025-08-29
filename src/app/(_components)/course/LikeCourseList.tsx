'use client';

import { useEffect, useState } from 'react';

import CourseList from '@/app/(_components)/course/CourseList';
import { ICourse } from '@/app/(_utils)/type';

interface LikedCourseProps {
  course: ICourse;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LikeCourseList({ course, setIsOpen }: LikedCourseProps) {
  const [originalCourse, setOriginalCourse] = useState<ICourse | null>(null);
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    setOriginalCourse(course);
    setCurrentCourse(course);
  }, [course]);

  const isModified =
    originalCourse && currentCourse ? JSON.stringify(originalCourse) !== JSON.stringify(currentCourse) : false;

  return (
    <>
      {currentCourse && (
        <CourseList isEditable={true} course={currentCourse} setCourse={setCurrentCourse} setIsOpen={setIsOpen} />
      )}
      <button
        className={`absolute bottom-0 left-0 mx-[16px] mb-[30px] py-[16px] px-[127px] bg-gn1 text-white font-semibold tracking-[-0.013em] rounded-lg border border-gn5
    transition-all duration-300 ease-in-out
    ${isModified ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
  `}
      >
        코스 수정하기
      </button>
    </>
  );
}
