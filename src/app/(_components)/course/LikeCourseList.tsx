'use client';

import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import CourseList from '@/app/(_components)/course/CourseList';
import CourseModifyButton from './CourseModifyButton';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface LikedCourseProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleLength: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LikeCourseList({ setIsOpen, setTitleLength }: LikedCourseProps) {
  const { id } = useParams();
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const { handleAccessExpired } = useHandleTokenExpired();
  const [isModified, setIsModified] = useState(false);

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
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        await handleAccessExpired('INVALID_TOKEN');
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

  const { data: originalCourse, refetch } = useQuery({
    queryKey: ['myCourse', id],
    queryFn: fetchCourse,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (originalCourse && currentCourse) {
      setIsModified(JSON.stringify(originalCourse) !== JSON.stringify(currentCourse));
    } else {
      setIsModified(false);
    }
  }, [originalCourse, currentCourse]);

  return (
    <>
      {currentCourse && (
        <CourseList
          isEditable={true}
          course={currentCourse}
          setCourse={setCurrentCourse}
          setIsOpen={setIsOpen}
          setTitleLength={setTitleLength}
        />
      )}
      <CourseModifyButton
        isModified={isModified}
        setIsModified={setIsModified}
        currentCourse={currentCourse as ICourse}
        refetch={refetch}
      />
    </>
  );
}
