'use client';

import Image from 'next/image';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import like from '/public/images/icons/like.svg';
import noLike from '/public/images/icons/no-like.svg';
import { useAtomValue } from 'jotai';
import { useState } from 'react';

export default function SpotItem() {
  const [isLiked, setIsLiked] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <li className="max-w-[102px] flex flex-col">
      <div className="w-[102px] h-[102px] rounded-lg border border-g3 bg-white relative">
        <div className="absolute top-[8px] left-[8px] py-[3px] px-[4px] rounded-sm text-white bg-gn2 text-xs tracking-[-2%]">
          대구
        </div>
      </div>
      <div className="mt-[20px] flex justify-between items-center">
        <p className="text-xs text-g3 tracking-[-2%]">명상</p>
        <Image
          className={`cursor-pointer ${
            isLoggedIn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          src={isLiked ? like : noLike}
          alt="쉼표"
          width={24}
          height={24}
          onClick={() => setIsLiked(!isLiked)}
          aria-hidden={!isLoggedIn}
        />
      </div>
      <p className="mt-[8px] font-semibold text-xs text-b3 tracking-[-2%] line-clamp-2">
        최대 두 줄의 텍스트를 입력해 주세요
      </p>
    </li>
  );
}
