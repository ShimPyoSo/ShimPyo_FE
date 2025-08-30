'use client';

import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import modify from '/public/images/icons/course/modify.svg';
import modifyActive from '/public/images/icons/course/modifyActive.svg';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';

interface CourseTitleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  course: ICourse;
}

export default function CourseTitle({ title, setTitle, course }: CourseTitleProps) {
  const [titleModify, setTitleModify] = useState(false);
  const { handleAccessExpired } = useHandleTokenExpired();

  useEffect(() => {
    if (course) setTitle(course.title);
  }, [course, setTitle]);

  const handleSaveTitle = async () => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/title`, {
        withCredentials: true,
      });
      setTitleModify(false);
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/title`, {
            withCredentials: true,
          });
          setTitleModify(false);
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-[275px] flex items-center">
      {titleModify ? (
        <input
          className="font-semibold text-lg text-b1 placeholder:text-g3 w-fit max-w-[240px] outline-none"
          placeholder="코스 이름을 지어 보세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSaveTitle();
          }}
          autoFocus
        />
      ) : (
        <p className="font-semibold text-lg text-b1 max-w-[240px] truncate">{title}</p>
      )}
      <Image
        className="cursor-pointer"
        src={titleModify ? modifyActive : modify}
        alt="수정"
        width={24}
        height={24}
        onClick={() => setTitleModify((prev) => !prev)}
        role="button"
      />
    </div>
  );
}
