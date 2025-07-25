'use client';

import ImageModal from '@/app/(_components)/image/ImageModal';
import Link from 'next/link';
import ReviewList from '@/app/(_components)/category/review/ReviewList';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Review() {
  const { type, id } = useParams();
  const [hasReview, setHasReview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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

        <ReviewList hasReview={hasReview} setHasReview={setHasReview} setIsOpen={setIsOpen} />
      </div>
      {isOpen && <ImageModal setIsOpen={setIsOpen} />}
    </>
  );
}
