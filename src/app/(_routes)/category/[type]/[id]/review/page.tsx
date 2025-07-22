'use client';

import Link from 'next/link';
import ReviewItem from '@/app/(_components)/category/review/ReviewItem';
import { useParams } from 'next/navigation';

export default function Review() {
  const { type, id } = useParams();

  return (
    <div className="min-h-full bg-w1 px-[16px] pb-[40px]">
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

      <ul className="mt-[50px]">
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </ul>
    </div>
  );
}
