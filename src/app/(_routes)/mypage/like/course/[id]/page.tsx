'use client';

import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import LikeCourseList from '@/app/(_components)/course/LikeCourseList';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function LikedCourse() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [, setTitle] = useAtom(setTitleAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchCourse = async (): Promise<ICourse> => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes/detail?courseId=${id}`,
        { withCredentials: true }
      );
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
          return res.data;
        } catch {}
      }
      throw err;
    }
  };

  const { data } = useQuery({
    queryKey: ['myCourse', id],
    queryFn: fetchCourse,
  });

  useEffect(() => {
    setTitle('맞춤 쉼표 코스');
  }, [setTitle]);

  return (
    <>
      <div className="bg-w1 px-[16px] pb-[70px]">{data && <LikeCourseList course={data} setIsOpen={setIsOpen} />}</div>
      {isOpen && (
        <Alert
          title="링크 복사"
          description={'여행지 링크가 복사되었습니다.\n친구에게 공유해 보세요.'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
