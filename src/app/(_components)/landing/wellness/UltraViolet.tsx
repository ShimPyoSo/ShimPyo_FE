'use client';

import Image from 'next/image';
import { useFetchUltraViolet } from '@/app/(_utils)/hooks/useFetchUltraViolet';
import uv from '/public/images/icons/wellness/ultraviolet.svg';

export default function UltraViolet() {
  const { ultraviolet } = useFetchUltraViolet();

  return (
    <li className="flex flex-col items-center text-xs">
      <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
        <Image src={uv} alt="자외선" width={24} height={24} />
      </div>
      <p className="mt-[12px] text-g1 tracking-[-2%]">자외선지수</p>
      <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">
        {ultraviolet <= 2
          ? '낮음'
          : ultraviolet <= 5
          ? '보통'
          : ultraviolet <= 7
          ? '높음'
          : ultraviolet <= 10
          ? '매우 높음'
          : '극심'}
      </p>
    </li>
  );
}
