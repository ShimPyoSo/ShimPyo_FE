'use client';

import Image from 'next/image';
import SpotDropDown from './SpotDropDown';
import location from '/public/images/icons/spot/location.svg';
import time from '/public/images/icons/spot/time.svg';
import { useState } from 'react';

interface SpotItemProps {
  isEditable: boolean;
}

export default function SpotItem({ isEditable }: SpotItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="grow h-[98px] bg-white rounded-lg py-[12px] px-[8px] flex items-center">
      <div className="w-[128px] h-full bg-w1 rounded-md"></div>
      <div className="ml-[7px] h-full grow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-b1 tracking-[-2%]">장소명</p>
          {isEditable && <SpotDropDown isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
        <div>
          <div className="flex items-center gap-[4px]">
            <Image src={location} alt="위치" width={11} height={11} />
            <p className="text-xs text-g1 line-clamp-1">서울특별시 영등포구 여의나루로 121</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <Image src={time} alt="영업시간" width={11} height={11} />
            <p className="text-xs text-g1 line-clamp-1">매일 9:00 - 20:00</p>
          </div>
        </div>
      </div>
    </li>
  );
}
