'use client';

import { useRef, useState } from 'react';

import Carousel from '../../UI/Carousel';
import { IReview } from '@/app/(_utils)/type';
import Image from 'next/image';
import ImageModal from '../../image/ImageModal';
import Link from 'next/link';
import ReviewItem from './ReviewItem';
import ReviewSkeleton from './ReviewSkeleton';
import WebCarouselArrow from '../../UI/WebCarouselArrow';
import arrow from '/public/images/icons/arrow.svg';
import axios from 'axios';
import { isMobile } from 'react-device-detect';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Review({ type }: { type: 'detail' | 'course' }) {
  const { id } = useParams();
  const [reviewImg, setReviewImg] = useState<string[] | null>(null);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          <div className="flex items-center gap-[5px]">
            <p className="font-[kkubulim] text-lg text-gn1 tracking-[-2%]">방문객 후기</p>
            {type === 'detail' && (
              <Link href={`/category/${id}/review`} className="flex items-center gap-[2px] text-g3 text-xs">
                전체보기
                <Image className="rotate-90" src={arrow} alt="전체보기" width={16} height={16} />
              </Link>
            )}
          </div>
          <div className="flex items-center justify-between">
            <small className="text-g1">
              {isLoading || reviews.length > 0
                ? '쉼표 유저들의 생생한 방문 후기를 들어보세요'
                : '아직 방문객 후기가 없어요, 가장 먼저 등록해 보세요!'}
            </small>
            {!isMobile && reviews.length > 0 && <WebCarouselArrow scrollRef={scrollRef} scrollStep={290} />}
          </div>
        </div>

        <Carousel ref={scrollRef}>
          <ul className="mt-[16px] px-[16px] flex gap-[12px] flex-nowrap w-max">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <ReviewSkeleton key={i} />)
              : reviews.length > 0 &&
                reviews.map((review) => (
                  <ReviewItem
                    setReviewImg={setReviewImg}
                    setSelectedNumber={setSelectedNumber}
                    review={review}
                    key={review.reviewId}
                  />
                ))}
          </ul>
        </Carousel>
      </section>
      {reviewImg && <ImageModal reviewImg={reviewImg} setReviewImg={setReviewImg} selectedNumber={selectedNumber} />}
    </>
  );
}
