'use client';

import Carousel from '../../landing/Carousel';
import Image from 'next/image';
import Link from 'next/link';
import ReviewItem from './ReviewItem';
import arrow from '/public/images/icons/arrow.svg';
import { useParams } from 'next/navigation';

export default function Review() {
  const { type, id } = useParams();

  return (
    <section>
      <div className="mt-[60px] px-[16px]">
        <div className="flex justify-between">
          <p className="font-[kkubulim] text-lg text-gn1 tracking-[-2%]">방문객 후기</p>
          <Link href={`/category/${type}/${id}/review`} className="flex items-center gap-[2px] text-g3 text-xs">
            전체보기
            <Image className="rotate-90" src={arrow} alt="전체보기" width={16} height={16} />
          </Link>
        </div>
        <small className="text-g1">쉼표 유저들의 생생한 방문 후기를 들어보세요</small>
      </div>
      <Carousel>
        <ul className="mt-[16px] px-[16px] flex gap-[12px] flex-nowrap w-max">
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </ul>
      </Carousel>
    </section>
  );
}
