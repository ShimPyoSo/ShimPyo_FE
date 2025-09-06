'use client';

import { IError, ISpot } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import Carousel from '../UI/Carousel';
import SpotItem from './SpotItem';
import SpotSkeleton from './SpotSkeleton';
import WebCarouselArrow from '../UI/WebCarouselArrow';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

export default function Recommend() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchSpots = async (): Promise<ISpot[]> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/main/recommends`, {
        withCredentials: isLoggedIn,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/main/likes`, {
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

  const { data: spots = [], isLoading } = useQuery({
    queryKey: ['spots'],
    queryFn: fetchSpots,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="mt-[70px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">여행지 추천</h3>
      <div className="flex items-center justify-between  mb-[16px]">
        <p className="mt-[2px] text-sm text-g1">
          {isLoading || spots.length === 0
            ? '지금 마음에 드는 여행지에 쉼표를 찍어 보세요'
            : '좋아하실 만한 여행지를 추천해 드려요'}
        </p>
        {isMobile || <WebCarouselArrow scrollRef={scrollRef} scrollStep={330} />}
      </div>

      <Carousel ref={scrollRef}>
        <ul className="pr-[16px] flex gap-[12px] flex-nowrap w-max">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SpotSkeleton key={i} />)
            : spots.map((spot) => <SpotItem key={spot.id} spot={spot} />)}
        </ul>
      </Carousel>
    </section>
  );
}
