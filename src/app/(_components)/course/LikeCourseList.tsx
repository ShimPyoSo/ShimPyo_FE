'use client';

import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import CourseList from '@/app/(_components)/course/CourseList';
import CourseModifyButton from './CourseModifyButton';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface LikedCourseProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LikeCourseList({ setIsOpen }: LikedCourseProps) {
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchCourse = async (): Promise<ICourse> => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes/detail?courseId=${id}`,
        { withCredentials: true }
      );
      setCurrentCourse(res.data);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes/detail?courseId=${id}`,
            { withCredentials: true }
          );
          setCurrentCourse(res.data);
          return res.data;
        } catch {}
      }
      throw err;
    }
  };

  const { data: originalCourse } = useQuery({
    queryKey: ['myCourse', id],
    queryFn: fetchCourse,
  });

  const isModified =
    originalCourse && currentCourse ? JSON.stringify(originalCourse) !== JSON.stringify(currentCourse) : false;

  return (
    <>
      {currentCourse && (
        <CourseList isEditable={true} course={currentCourse} setCourse={setCurrentCourse} setIsOpen={setIsOpen} />
      )}
      <CourseModifyButton isModified={isModified} currentCourse={currentCourse as ICourse} />
    </>
  );
}
