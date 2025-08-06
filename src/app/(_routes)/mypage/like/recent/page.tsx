'use client';

import { IError, ISpot } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

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
      if (err.response?.data?.name === 'INVALID_TOKEN') {
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
    <div className="bg-w1 px-[16px] pb-[40px]">
      <ul className="overflow-y-auto">
        {data && data.length > 0 ? (
          data.map((spot) => <SpotListItem key={spot.id} />)
        ) : (
          <li className="py-4 text-center text-g3">최근 본 관광지가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
