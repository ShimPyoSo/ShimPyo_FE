'use client';

import { IError, ISpot } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import Carousel from './Carousel';
import Image from 'next/image';
import SpotItem from './SpotItem';
import SpotSkeleton from './SpotSkeleton';
import arrow from '/public/images/icons/arrow.svg';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useQuery } from '@tanstack/react-query';

export default function Recommend() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  const fetchSpots = async (): Promise<ISpot[]> => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/main/recommends`, {
        withCredentials: isLoggedIn,
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
    queryKey: ['spots'],
    queryFn: fetchSpots,
    refetchOnWindowFocus: false,
  });

  return (
    <section className="mt-[70px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">여행지 추천</h3>
      <div className="flex items-center justify-between  mb-[16px]">
        <p className="mt-[2px] text-sm text-g1">좋아하실 만한 여행지를 추천해 드려요</p>
        {isMobile || (
          <div className="flex items-center">
            <Image src={arrow} alt="왼쪽" width={26} height={26} className="-rotate-90 cursor-pointer" role="button" />
            <Image src={arrow} alt="오른쪽" width={26} height={26} className="rotate-90 cursor-pointer" role="button" />
          </div>
        )}
      </div>

      <Carousel>
        <ul className="pr-[16px] flex gap-[12px] flex-nowrap w-max">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SpotSkeleton key={i} />)
            : spots.map((spot) => <SpotItem key={spot.id} spot={spot} />)}
        </ul>
      </Carousel>
    </section>
  );
}
