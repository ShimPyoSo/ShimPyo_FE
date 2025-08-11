'use client';

import axios, { AxiosError } from 'axios';

import { IError } from '@/app/(_utils)/type';
import { IReviewSpot } from '@/app/(_utils)/type';
import NoReview from '../../category/NoReview';
import SpotListItem from '@/app/(_components)/category/SpotListItem';
import SpotSkeleton from '../../category/SpotSkeleton';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';

export default function ReviewSpotList() {
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchReviews = async (): Promise<IReviewSpot[]> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review`, {
            withCredentials: true,
          });
          return res.data;
        } catch {
          return [];
        }
      }
      console.log(err.response?.data?.message);
      return [];
    }
  };

  const { data: spots = [], isLoading } = useQuery<IReviewSpot[]>({
    queryKey: ['reviewSpot'],
    queryFn: fetchReviews,
    refetchOnWindowFocus: false,
  });

  return (
    <ul className="h-full">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => <SpotSkeleton key={i} type="review" />)
      ) : spots.length > 0 ? (
        spots.map((spot, idx) => <SpotListItem type="review" key={idx} />)
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <NoReview main="첫 번째 여행 이야기를 남겨주세요!" description="아직 작성하신 후기가 없어요" />
        </div>
      )}
    </ul>
  );
}
