'use client';

import { IError, ISpot } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import ImageCarousel from './ImageCarousel';
import Liked from '@/app/(_components)/spot/Liked';
import Review from '@/app/(_components)/category/Detail/Review';
import Share from '@/app/(_components)/UI/Share';
import SpotInfo from '@/app/(_components)/category/Detail/SpotInfo';
import Wellness from '@/app/(_components)/category/Detail/Wellness';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';

interface SpotDetailComponentProps {
  id: number;
  type: 'detail' | 'course';
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpotDetailComponent({ id, type, setIsOpen }: SpotDetailComponentProps) {
  const [, setTitle] = useAtom(setTitleAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchSpotInfo = async (): Promise<ISpot> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/detail?id=${id}`, {
        withCredentials: isLoggedIn,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        await handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/detail?id=${id}`, {
            withCredentials: isLoggedIn,
          });
          return res.data;
        } catch {
          // reissue 이후 에러처리
          throw error;
        }
      }
      throw error;
    }
  };

  const { data } = useQuery<ISpot>({
    queryKey: ['spot', id],
    queryFn: fetchSpotInfo,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (type === 'detail' && data?.title) {
      setTitle(data.title);
    }
  }, [data?.title, setTitle, type]);

  return (
    <>
      <div className="min-h-full bg-w1 pb-[40px]">
        {data?.images && <ImageCarousel images={data?.images as string[]} />}
        <div className="px-[16px] mt-[24px] flex items-center justify-between">
          <div className="flex gap-[6px] items-center">
            <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-sm text-gn7 font-semibold bg-white">
              {data?.region}
            </div>
            <p className="text-b1 text-lg font-semibold">{data?.title}</p>
          </div>
          {
            <div className={`flex items-center gap-[4px] ${type === 'course' ? 'hidden' : ''}`}>
              <Liked liked={data?.isLiked as boolean} id={Number(id)} type="detail" />
              <Share setIsOpen={setIsOpen} type="spot" />
            </div>
          }
        </div>

        {data && <SpotInfo spot={data} />}
        <Review type={type} />
        {data && <Wellness spot={data} type={type} />}
      </div>
    </>
  );
}
