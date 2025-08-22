'use client';

import { useEffect, useState } from 'react';

import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import Liked from '../spot/Liked';
import Link from 'next/link';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import location from '/public/images/icons/spot/location.svg';
import review from '/public/images/icons/spot/review.svg';
import time from '/public/images/icons/spot/time.svg';
import { useAtomValue } from 'jotai';

interface SpotListItemProps {
  type: 'review' | 'spot';
  spot: ISpot;
}

export default function SpotListItem({ type, spot }: SpotListItemProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (spot.isLiked) setIsLiked(spot.isLiked);
  }, [spot]);

  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <li className="py-[18px] flex gap-[12px] border-b border-w5">
      <Link
        className="w-[102px] h-[113px] bg-white border border-w4 rounded-xl cursor-pointer"
        href={`${type === 'spot' ? `/category/${spot.id}` : `/mypage/review/${spot.touristId}`}`}
      ></Link>
      <div className="grow-1 py-[3px] flex flex-col">
        <div className="flex justify-between items-center">
          <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-xs text-gn7 font-semibold bg-white">
            {spot.region}
          </div>
          {isLoggedIn && type === 'spot' && <Liked liked={isLiked} id={spot.id as number} type="list" />}
        </div>
        <div className="grow-1">
          <Link
            className="text-sm text-b3 font-semibold tracking-[-2%] line-clamp-2 cursor-pointer"
            href={`${type === 'spot' ? '/category' : '/mypage/review'}/${spot.id}`}
          >
            {spot.title}
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-[4px]">
            <Image src={location} alt="위치" width={14} height={14} />
            <p className="text-xs text-g1 truncate">{spot.address}</p>
          </div>
          {type === 'spot' ? (
            <div className="flex items-center gap-[4px]">
              <Image src={time} alt="영업시간" width={14} height={14} />
              <p className="text-xs text-g1 truncate">{`${spot.operationTime?.openTime} - ${spot.operationTime?.closeTime}`}</p>
            </div>
          ) : (
            <div className="flex items-center gap-[4px]">
              <Image src={review} alt="후기" width={14} height={14} />
              <p className="text-xs text-g1">내가 쓴 후기 {spot.counts}개</p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
