'use client';

import Carousel from '../../landing/Carousel';
import { IReview } from '@/app/(_utils)/type';
import Image from 'next/image';
import ImageModal from '../../image/ImageModal';
import Link from 'next/link';
import NoReview from '../NoReview';
import ReviewItem from './ReviewItem';
import ReviewSkeleton from './ReviewSkeleton';
import arrow from '/public/images/icons/arrow.svg';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Review() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const fetchReviews = async (): Promise<IReview[]> => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/reviews?limit=4&touristId=${id}`);
    const data = res.data;
    return Array.isArray(data) ? data : [];
  };

  const { data: reviews = [], isLoading } = useQuery<IReview[]>({
    queryKey: ['reviews', id],
    queryFn: fetchReviews,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <section>
        <div className="mt-[60px] px-[16px]">
          <div className="flex justify-between">
            <p className="font-[kkubulim] text-lg text-gn1 tracking-[-2%]">방문객 후기</p>
            <Link href={`/category/${id}/review`} className="flex items-center gap-[2px] text-g3 text-xs">
              전체보기
              <Image className="rotate-90" src={arrow} alt="전체보기" width={16} height={16} />
            </Link>
          </div>
          <small className="text-g1">쉼표 유저들의 생생한 방문 후기를 들어보세요</small>
        </div>
        <Carousel>
          <ul className="mt-[16px] px-[16px] flex gap-[12px] flex-nowrap w-max">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <ReviewSkeleton key={i} />)
            ) : reviews.length === 0 ? (
              <div className="mt-[12px] w-[350px] flex flex-col justify-center items-center">
                <NoReview />
              </div>
            ) : (
              Array.isArray(reviews) &&
              reviews.map((review) => <ReviewItem setIsOpen={setIsOpen} review={review} key={review.reviewId} />)
            )}
          </ul>
        </Carousel>
      </section>
      {isOpen && <ImageModal setIsOpen={setIsOpen} />}
    </>
  );
}
