'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

export default function CourseItemSkeleton() {
  return (
    <li className="py-[12px] flex items-center justify-between border-b border-w6">
      <Skeleton width={73} height={73} borderRadius={6} />

      <div className="ml-[12px] flex items-start justify-between grow">
        <div className="flex flex-col font-semibold tracking-[-2%]">
          <Skeleton width={60} height={20} borderRadius={4} />
          <div className="mt-[4px]">
            <Skeleton width={150} height={18} />
          </div>
        </div>
        <div className="flex items-center gap-[6px]">
          <Skeleton circle width={24} height={24} />
          <Skeleton circle width={24} height={24} />
        </div>
      </div>
    </li>
  );
}
