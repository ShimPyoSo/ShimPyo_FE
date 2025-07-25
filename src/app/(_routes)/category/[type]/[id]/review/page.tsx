'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReviewItem from '@/app/(_components)/category/review/ReviewItem';
import noReview from '/public/images/noReview.svg';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Review() {
  const { type, id } = useParams();
  const [hasReview, setHasReview] = useState(false);

  return (
    <div className="min-h-full bg-w1 px-[16px]">
      <div className="mt-[30px] flex items-start justify-between tracking-[-2%]">
        <div>
          <p className="font-[kkubulim] text-lg text-gn1">방문객 후기</p>
          <small className="text-sm text-g1">다양한 방문 후기를 읽고 작성해 보세요</small>
        </div>
        <Link
          className="text-sm text-w3 bg-gn1 border border-gn5 rounded-md py-[6px] px-[12px]"
          href={`/category/${type}/${id}/review/write`}
          role="button"
        >
          작성하기
        </Link>
      </div>

      {hasReview ? (
        <ul className="flex flex-col gap-[12px] mt-[50px] pb-[40px]">
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </ul>
      ) : (
        <div
          className="flex flex-col justify-center items-center h-[calc(100vh-120px)]"
          onClick={() => setHasReview(true)}
        >
          <Image className="mb-[24px]" src={noReview} alt="리뷰 없음" width={172} height={95} />
          <p className="text-xs text-g1 tracking-[-2%]">가장 먼저 후기를 남겨보세요!</p>
          <p className="text-sm text-b3 font-semibold tracking-[-1.3%]">아직 방문객 후기가 없어요</p>
        </div>
      )}
    </div>
  );
}
