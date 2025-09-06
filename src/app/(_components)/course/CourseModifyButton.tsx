'use client';

import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';

interface CourseModifyButtonProps {
  currentCourse: ICourse;
  isModified: boolean;
}

export default function CourseModifyButton({ currentCourse, isModified }: CourseModifyButtonProps) {
  const { handleAccessExpired } = useHandleTokenExpired();

  const handleUpdateCourse = async () => {
    if (!currentCourse) return;

    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course`, currentCourse, { withCredentials: true });
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course`, currentCourse, {
            withCredentials: true,
          });
        } catch {
          // reissue 이후 에러처리
          throw error;
        }
      }
      console.log(err.response?.data?.message);
      throw error;
    }
  };

  return (
    <button
      className={`absolute bottom-[80px] left-0 mx-[16px] mb-[30px] py-[16px] px-[127px] bg-gn1 text-white font-semibold tracking-[-0.013em] rounded-lg border border-gn5
    transition-all duration-300 ease-in-out
    ${isModified ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
  `}
      onClick={handleUpdateCourse}
    >
      코스 수정하기
    </button>
  );
}
