'use client';

import { IError, ISpot } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import NoReview from '../../category/NoReview';
import SpotListItem from '@/app/(_components)/category/SpotListItem';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';

const STORAGE_KEY = 'visitedSpots';

export default function RecentSpot() {
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchRecentSpots = async (): Promise<ISpot[]> => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const spotIds = stored ? JSON.parse(stored) : [];
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/tourist`, spotIds, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/tourist`, spotIds, {
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

  const { data } = useQuery({
    queryKey: ['recentSpots'],
    queryFn: fetchRecentSpots,
  });

  return (
    <>
      {data && data.length > 0 ? (
        <ul className="overflow-y-auto">
          {data.map((spot) => (
            <SpotListItem key={spot.id} type="spot" spot={spot} />
          ))}
        </ul>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <NoReview main="지금, 가고 싶은 웰니스 여행지를 탐색해 보세요!" description="최근 본 여행지가 없어요" />
        </div>
      )}
    </>
  );
}
