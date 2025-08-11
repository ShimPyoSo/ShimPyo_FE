'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export default function SpotSkeleton({ type }: { type: 'review' | 'spot' }) {
  return (
    <li className="py-[18px] flex gap-[12px] border-b border-w5">
      <div className="w-[102px] h-[113px] bg-white border border-w4 rounded-xl flex items-center justify-center">
        <Skeleton width={102} height={113} borderRadius={12} />
      </div>

      <div className="grow-1 py-[3px] flex flex-col w-full">
        <div className="flex justify-between items-center">
          <Skeleton width={40} height={20} borderRadius={4} />
          {type === 'spot' && <Skeleton circle width={30} height={30} />}
        </div>

        <div className="grow-1 mt-[4px]">
          <Skeleton width="80%" height={16} />
        </div>

        <div className="mt-[8px] flex flex-col gap-[4px]">
          <div className="flex items-center gap-[4px]">
            <Skeleton circle width={14} height={14} />
            <Skeleton width="70%" height={12} />
          </div>
          <div className="flex items-center gap-[4px]">
            <Skeleton circle width={14} height={14} />
            <Skeleton width="50%" height={12} />
          </div>
        </div>
      </div>
    </li>
  );
}
