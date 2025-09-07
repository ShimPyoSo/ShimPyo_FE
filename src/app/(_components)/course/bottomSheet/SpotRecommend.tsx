'use client';

import Carousel from '../../UI/Carousel';
import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotItem from '../../landing/SpotItem';
import SpotSkeleton from '../../landing/SpotSkeleton';
import WebCarouselArrow from '../../UI/WebCarouselArrow';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import refetchIcon from '/public/images/icons/course/refetch.svg';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

interface SpotRecommendProps {
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
}

export default function SpotRecommend({ setDetailId }: SpotRecommendProps) {
  const { id } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['recommendSpots', id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/addition?courseId=${id}`, {
        withCredentials: true,
      });
      return res.data as ISpot[];
    },
  });

  return (
    <section>
      <div className="mb-[8px] flex items-center justify-between">
        <div className="mt-[18px] flex items-center">
          <p className="tracking-[-0.02em] text-g1 text-xs">다른 여행지 추천 받기</p>
          <Image src={refetchIcon} alt="다시 추천" width={20} height={20} onClick={() => refetch()} />
        </div>
        {isMobile || <WebCarouselArrow scrollRef={scrollRef} scrollStep={330} />}
      </div>

      <Carousel ref={scrollRef}>
        <ul className="pr-[16px] flex gap-[12px] flex-nowrap w-max">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => <SpotSkeleton key={i} />)
            : data?.map((spot, idx) => <SpotItem spot={spot} key={idx} type="addition" setDetailId={setDetailId} />)}
        </ul>
      </Carousel>
    </section>
  );
}
