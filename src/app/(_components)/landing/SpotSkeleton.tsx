'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export default function SpotSkeleton() {
  return (
    <li className="max-w-[102px] flex flex-col">
      <div className="relative w-[102px] h-[102px] rounded-lg">
        <Skeleton width={102} height={102} borderRadius={8} />
        <div className="absolute top-[8px] left-[8px]">
          <Skeleton width={32} height={16} borderRadius={4} />
        </div>
      </div>
      <div className="mt-[20px] flex justify-between items-center">
        <Skeleton width={60} height={12} />
        <Skeleton circle width={16} height={16} />
      </div>
      <div className="mt-[8px] space-y-[2px]">
        <Skeleton width={90} height={12} />
        <Skeleton width={70} height={12} />
      </div>
    </li>
  );
}
