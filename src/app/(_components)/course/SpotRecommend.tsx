'use client';

import Carousel from '../UI/Carousel';
import { ICourseAddition } from '@/app/(_utils)/type';
import Image from 'next/image';
import SpotSkeleton from '../landing/SpotSkeleton';
import { UseFormRegister } from 'react-hook-form';
import WebCarouselArrow from '../UI/WebCarouselArrow';
import { isMobile } from 'react-device-detect';
import refetchIcon from '/public/images/icons/course/refetch.svg';
import { useRef } from 'react';

interface SpotRecommendProps {
  register: UseFormRegister<ICourseAddition>;
}

export default function SpotRecommend({}: SpotRecommendProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section>
      <div className="mt-[22px] mb-[8px] flex items-center justify-between">
        <div className="flex items-center">
          <p className="tracking-[-2%] text-g1 text-xs">다른 여행지 추천 받기</p>
          <Image src={refetchIcon} alt="다시 추천" width={20} height={20} />
        </div>
        {isMobile || <WebCarouselArrow scrollRef={scrollRef} scrollStep={330} />}
      </div>

      <Carousel ref={scrollRef}>
        <ul className="pr-[16px] flex gap-[12px] flex-nowrap w-max">
          {Array.from({ length: 5 }).map((_, i) => (
            <SpotSkeleton key={i} />
          ))}
        </ul>
      </Carousel>
    </section>
  );
}
