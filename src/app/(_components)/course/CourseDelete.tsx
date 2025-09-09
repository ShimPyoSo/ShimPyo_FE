'use client';

import axios, { AxiosError } from 'axios';

import { IError } from '@/app/(_utils)/type';
import Image from 'next/image';
import trash from '/public/images/icons/course/trash.svg';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useRouter } from 'next/navigation';

interface CourseDeleteProps {
  courseId: number;
  type: 'list' | 'detail';
  refetch?: () => void;
}

export default function CourseDelete({ courseId, type, refetch }: CourseDeleteProps) {
  const { handleAccessExpired } = useHandleTokenExpired();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course?id=${courseId}`, {
        withCredentials: true,
      });
      if (type === 'detail') router.push('/mypage/like/course');
      else refetch?.();
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.delete(`/api/course?id=${courseId}`, { withCredentials: true });
          if (type === 'detail') router.push('/mypage/like/course');
          else refetch?.();
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <button onClick={handleDelete}>
      <Image src={trash} alt="삭제" width={24} height={24} />
    </button>
  );
}
