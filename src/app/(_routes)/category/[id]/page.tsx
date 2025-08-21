'use client';

import { useEffect, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import { ISpot } from '@/app/(_utils)/type';
import Liked from '@/app/(_components)/spot/Liked';
import Review from '@/app/(_components)/category/Detail/Review';
import Share from '@/app/(_components)/UI/Share';
import SpotInfo from '@/app/(_components)/category/Detail/SpotInfo';
import Wellness from '@/app/(_components)/category/Detail/Wellness';
import axios from 'axios';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRecentSpots } from '@/app/(_utils)/hooks/useRecentSpots';

export default function SpotDetail() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [, setTitle] = useAtom(setTitleAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  useRecentSpots();

  const fetchSpotInfo = async (): Promise<ISpot> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/detail?id=${id}`, {
      withCredentials: isLoggedIn,
    });
    return res.data;
  };

  const { data } = useQuery<ISpot>({
    queryKey: ['spot', id],
    queryFn: fetchSpotInfo,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.title) {
      setTitle(data.title);
    }
  }, [data?.title, setTitle]);

  return (
    <>
      <div className="min-h-full bg-w1 pb-[40px]">
        <div className="mt-[30px] h-[206px] mx-[16px] bg-white border border-w4 rounded-2xl"></div>
        <div className="px-[16px] mt-[24px] flex items-center justify-between">
          <div className="flex gap-[6px] items-center">
            <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-sm text-gn7 font-semibold bg-white">
              {data?.region}
            </div>
            <p className="text-b1 text-lg font-semibold">{data?.title}</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <Liked liked={data?.isLiked as boolean} id={Number(id)} />
            <Share setIsOpen={setIsOpen} type="spot" />
          </div>
        </div>

        {data && <SpotInfo spot={data} />}
        <Review />
        {data && <Wellness spot={data} />}
      </div>
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
