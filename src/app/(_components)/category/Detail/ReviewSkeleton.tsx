'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export default function ReviewSkeleton() {
  return (
    <li className="w-[280px] h-[186px] p-[16px] rounded-lg border border-w4 bg-[#fbfbfb]">
      <div className="flex items-center justify-between mb-[8px]">
        <Skeleton width={60} height={16} />
        <Skeleton width={50} height={14} />
      </div>
      <div className="mb-[8px] space-y-[4px]">
        <Skeleton count={2} height={12} />
      </div>
      <ul className="mt-[12px] flex items-center gap-[8px]">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i}>
            <Skeleton width={56} height={62} borderRadius="4px" />
          </li>
        ))}
      </ul>
    </li>
  );
}
