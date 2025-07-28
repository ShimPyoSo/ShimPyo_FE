'use client';

import Carousel from './Carousel';
import { ISpot } from '@/app/(_utils)/type';
import SpotItem from './SpotItem';
import axios from 'axios';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { useAtomValue } from 'jotai';
import { useQuery } from '@tanstack/react-query';

export default function Recommend() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const fetchSpots = async (): Promise<ISpot[]> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/recommend`, {
      withCredentials: isLoggedIn,
    });
    return res.data;
  };

  const { data: spots = [] } = useQuery({
    queryKey: ['spots'],
    queryFn: fetchSpots,
  });

  return (
    <section className="mt-[70px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">여행지 추천</h3>
      <p className="mt-[2px] text-sm text-g1 mb-[16px]">좋아하실 만한 여행지를 추천해 드려요</p>
      <Carousel>
        <ul className="pr-[16px] flex gap-[12px] flex-nowrap w-max">
          {spots.map((spot) => (
            <SpotItem key={spot.id} spot={spot} />
          ))}
        </ul>
      </Carousel>
    </section>
  );
}
