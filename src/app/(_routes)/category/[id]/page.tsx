'use client';

import { ISpot } from '@/app/(_utils)/type';
import Review from '@/app/(_components)/category/Detail/Review';
import SpotInfo from '@/app/(_components)/category/Detail/SpotInfo';
import Wellness from '@/app/(_components)/category/Detail/Wellness';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRecentSpots } from '@/app/(_utils)/hooks/useRecentSpots';

export default function SpotDetail() {
  const { id } = useParams();
  useRecentSpots();

  const fetchSpotInfo = async (): Promise<ISpot> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/detail?id=${id}`);
    return res.data;
  };

  const { data } = useQuery<ISpot>({
    queryKey: ['spot', id],
    queryFn: fetchSpotInfo,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-full bg-w1 pb-[40px]">
      <div className="mt-[30px] h-[206px] mx-[16px] bg-white border border-w4 rounded-2xl"></div>
      <div className="px-[16px] mt-[24px] flex gap-[6px] items-center">
        <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-sm text-gn7 font-semibold bg-white">
          {data?.region}
        </div>
        <p className="text-b1 text-lg font-semibold">{data?.title}</p>
      </div>
      {data && <SpotInfo spot={data} />}
      <Review />
      {data && <Wellness spot={data} />}
    </div>
  );
}
