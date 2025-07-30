'use client';

import Review from '@/app/(_components)/category/Detail/Review';
import SpotInfo from '@/app/(_components)/category/Detail/SpotInfo';
import { useRecentSpots } from '@/app/(_utils)/hooks/useRecentSpots';

export default function SpotDetail() {
  useRecentSpots();

  return (
    <div className="min-h-full bg-w1 pb-[40px]">
      <div className="mt-[30px] h-[206px] mx-[16px] bg-white border border-w4 rounded-2xl"></div>
      <div className="px-[16px] mt-[24px] flex gap-[6px] items-center">
        <div className="px-[5px] py-[3px] border border-gn8 rounded-sm text-sm text-gn7 font-semibold bg-white">
          대구
        </div>
        <p className="text-b1 text-lg font-semibold">비비드요가&웰니스스튜디오</p>
      </div>
      <SpotInfo />
      <Review />
    </div>
  );
}
