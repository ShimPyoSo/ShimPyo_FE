'use client';

import CourseDelete from './CourseDelete';
import Link from 'next/link';
import Share from '../UI/Share';
import { testImages } from '@/app/(_utils)/constants';

interface CourseListItemProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseListItem({ setIsOpen }: CourseListItemProps) {
  const shimpyo = '땀흘리는 쉼표'; // 임시 쉼표 유형
  const currentItem = testImages.find((item) => item.name === shimpyo);
  if (!currentItem) return null;

  return (
    <li className="py-[12px] flex items-center justify-between border-b border-w6">
      <div className="w-[73px] h-[73px] bg-white border border-w4 rounded-md"></div>
      <div className="ml-[12px] flex items-start justify-between grow">
        <div className="flex flex-col font-semibold tracking-[-2%]">
          <div
            className="w-fit py-[3px] px-[5px] text-xs rounded-sm border"
            style={{
              border: `1px solid ${currentItem.color}4D`,
              color: currentItem.color,
            }}
          >
            {shimpyo}
          </div>
          <Link href={'/mypage/like/course/1'} className="mt-[4px] text-sm text-b3">
            1박 2일 전남 템플스테이
          </Link>
        </div>

        <div className="flex items-center gap-[6px]">
          <Share setIsOpen={setIsOpen} type="course" courseId={1} token="dsdfsdawd" />
          <CourseDelete courseId={123} type="list" />
        </div>
      </div>
    </li>
  );
}
