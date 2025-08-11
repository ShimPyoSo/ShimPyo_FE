'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export default function ReviewSkeleton() {
  return (
    <li className="p-[12px] bg-[#fbfbfb] border-w4 rounded-xl">
      <div className="flex items-center justify-between mb-[8px]">
        <Skeleton width={80} height={14} borderRadius={4} />
        <Skeleton width={50} height={12} borderRadius={4} />
      </div>

      <div className="space-y-[4px] mb-[6px]">
        <Skeleton height={10} />
        <Skeleton width="95%" height={10} />
        <Skeleton width="90%" height={10} />
        <Skeleton width="85%" height={10} />
      </div>

      <div className="flex gap-[4px] mt-[8px]">
        <Skeleton width={64} height={64} borderRadius={8} />
        <Skeleton width={64} height={64} borderRadius={8} />
        <Skeleton width={64} height={64} borderRadius={8} />
      </div>
    </li>
  );
}
