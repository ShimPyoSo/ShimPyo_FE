'use client';

import { ICourseAddition, ICourseList } from '@/app/(_utils)/type';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

import AddSpotButton from './AddSpotButton';
import Carousel from '../../UI/Carousel';
import { IError } from '@/app/(_utils)/type';
import Image from 'next/image';
import RecommendItem from './RecommendItem';
import SpotSkeleton from '../../landing/SpotSkeleton';
import WebCarouselArrow from '../../UI/WebCarouselArrow';
import { isMobile } from 'react-device-detect';
import refetchIcon from '/public/images/icons/course/refetch.svg';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

interface SpotRecommendProps {
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  detailId: number;
  selectedSpot: ICourseList | null;
  setSelectedSpot: React.Dispatch<React.SetStateAction<ICourseList | null>> | UseFormSetValue<ICourseAddition>;
  watch?: UseFormWatch<ICourseAddition>;
}

export default function SpotRecommend({ detailId, setDetailId, setSelectedSpot, watch }: SpotRecommendProps) {
  const { id } = useParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { handleAccessExpired } = useHandleTokenExpired();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['recommendSpots', id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/addition?courseId=${id}`, {
          withCredentials: true,
        });
        return res.data as ICourseList[];
      } catch (error) {
        const err = error as AxiosError<IError>;
        if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
          await handleAccessExpired('INVALID_TOKEN');
          try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/addition?courseId=${id}`, {
              withCredentials: true,
            });
            return res.data as ICourseList[];
          } catch {}
        }
        throw err;
      }
    },
    refetchOnWindowFocus: false,
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
            : data?.map((spot, idx) => (
                <RecommendItem spot={spot} key={idx} detailId={detailId} setDetailId={setDetailId} />
              ))}
        </ul>
      </Carousel>

      <AddSpotButton
        detailId={detailId}
        setDetailId={setDetailId}
        setSelectedSpot={setSelectedSpot}
        watch={watch}
        data={data}
      />
    </section>
  );
}
