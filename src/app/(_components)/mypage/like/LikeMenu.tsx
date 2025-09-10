'use client';

import Category from './Category';
import Image from 'next/image';
import Link from 'next/link';
import arrow from '/public/images/icons/arrow.svg';
import { useState } from 'react';

export default function LikeMenu() {
  const [isActive, setIsActive] = useState(true);

  return (
    <ul className="pt-[30px] text-xs text-b3 tracking-[-0.02em]">
      <li className="w-full py-[18px]">
        <div
          className={`flex justify-between items-center ${isActive ? '' : 'border-b border-w6'}`}
          onClick={() => setIsActive(!isActive)}
        >
          <p>카테고리별 여행지</p>
          <Image
            className={`transition-transform duration-300 ${isActive ? '' : 'rotate-180'}`}
            src={arrow}
            alt="더보기"
            width={24}
            height={24}
          />
        </div>
        {isActive && <Category />}
      </li>
      <li className="border-b border-w6">
        <Link href="/mypage/like/course" className="block py-[18px]">
          맞춤 쉼표 코스
        </Link>
      </li>
      <li className="border-b border-w6">
        <Link href="/mypage/like/recent" className="block py-[18px]">
          최근 본 여행지
        </Link>
      </li>
    </ul>
  );
}
