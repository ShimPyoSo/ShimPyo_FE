'use client';

import Image from 'next/image';
import Link from 'next/link';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import like from '/public/images/icons/like.svg';
import location from '/public/images/icons/spot/location.svg';
import noLike from '/public/images/icons/no-like.svg';
import review from '/public/images/icons/spot/review.svg';
import time from '/public/images/icons/spot/time.svg';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export default function SpotListItem({ type }: { type: 'review' | 'spot' }) {
  const [isLiked, setIsLiked] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <li className="py-[18px] flex gap-[12px] border-b border-w5">
      <Link
        className="w-[102px] h-[113px] bg-white border border-w4 rounded-xl cursor-pointer"
        href={`${type === 'spot' ? '/category' : '/mypage/review'}/1`}
      ></Link>
      <div className="grow-1 py-[3px] flex flex-col">
        <div className="flex justify-between items-center">
          <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-xs text-gn7 font-semibold bg-white">
            대구
          </div>
          {type === 'spot' && (
            <Image
              className={`cursor-pointer ${
                isLoggedIn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
              src={isLiked ? like : noLike}
              alt="쉼표"
              width={30}
              height={30}
              onClick={() => setIsLiked(!isLiked)}
              aria-hidden={!isLoggedIn}
            />
          )}
        </div>
        <div className="grow-1">
          <Link
            className="text-sm text-b3 font-semibold tracking-[-2%] line-clamp-2 cursor-pointer"
            href={`${type === 'spot' ? '/category' : '/mypage/review'}/1`}
          >
            최대 두 줄의 텍스트를 입력해 주세요
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-[4px]">
            <Image src={location} alt="위치" width={14} height={14} />
            <p className="text-xs text-g1">서울특별시 영등포구 여의나루로 121</p>
          </div>
          {type === 'spot' ? (
            <div className="flex items-center gap-[4px]">
              <Image src={time} alt="영업시간" width={14} height={14} />
              <p className="text-xs text-g1">매일 9:00 - 20:00</p>
            </div>
          ) : (
            <div className="flex items-center gap-[4px]">
              <Image src={review} alt="후기" width={14} height={14} />
              <p className="text-xs text-g1">내가 쓴 후기 3개</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
