'use client';

import { IError, ISpot } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import Carousel from '../UI/Carousel';
import SpotItem from './SpotItem';
import SpotSkeleton from './SpotSkeleton';
import WebCarouselArrow from '../UI/WebCarouselArrow';
import { isMobile } from 'react-device-detect';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

export default function LikedSpot() {
  const { handleAccessExpired } = useHandleTokenExpired();
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchSpots = async (): Promise<ISpot[]> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/main/likes`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
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
    queryKey: ['likedSpots'],
    queryFn: fetchSpots,
  });

  return (
    <section className="mt-[70px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">쉼표 찍은 여행지</h3>
      <div className="flex items-center justify-between  mb-[16px]">
        <p className="mt-[2px] text-sm text-g1">내가 가고 싶은 여행지를 확인해 보세요</p>
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
