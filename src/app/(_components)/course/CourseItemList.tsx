'use client';

import { ICourseInfo, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import CourseItemSkeleton from './CourseItemSkeleton';
import CourseListItem from '@/app/(_components)/course/CourseListItem';
import NoLiked from '../category/NoLiked';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';

interface CourseItemListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseItemList({ setIsOpen }: CourseItemListProps) {
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchLikedCourses = async () => {
    try {
      const response = await axios.get<ICourseInfo[]>(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes/course`,
        { withCredentials: true }
      );
      return response.data ?? [];
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        await handleAccessExpired('INVALID_TOKEN');
        try {
          const response = await axios.get<ICourseInfo[]>(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/likes/course`,
            { withCredentials: true }
          );
          return response.data ?? [];
        } catch {
          // reissue 이후 에러처리
          return [];
        }
      }

      return [];
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['likedCourses'],
    queryFn: fetchLikedCourses,
  });

  return (
    <ul className="mt-[12px] mb-[70px]">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, idx) => <CourseItemSkeleton key={idx} />)
      ) : data && data?.length > 0 ? (
        data?.map((item: ICourseInfo, idx: number) => (
          <CourseListItem key={idx} setIsOpen={setIsOpen} item={item} refetch={refetch} />
        ))
      ) : (
        <NoLiked
          type="course"
          main={'지금 다양한 여행 코스를 탐색해 보세요!'}
          description={'아직 찜한 여행 코스가 없어요'}
        />
      )}
    </ul>
  );
}
