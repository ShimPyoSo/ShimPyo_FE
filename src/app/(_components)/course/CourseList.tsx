'use client';

import DayItem from './DayItem';
import Image from 'next/image';
import Share from '../UI/Share';
import dynamic from 'next/dynamic';
import trash from '/public/images/icons/course/trash.svg';

const MapRender = dynamic(() => import('../spot/MapRender'), {
  ssr: false,
});

interface CourseListProps {
  isEditable: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseList({ isEditable, setIsOpen }: CourseListProps) {
  const latitude = 37.5665;
  const longitude = 126.978;

  return (
    <>
      <div className="mt-[30px] mb-[24px] flex items-end justify-between">
        <h2>
          <p className="font-[kkubulim] text-[#A3A3E3] text-sm">비우는 쉼표</p>
          <p className="font-semibold text-lg text-b1">1박 2일 전남 템플스테이</p>
        </h2>
        <div className="flex gap-[6px] items-center">
          <Share setIsOpen={setIsOpen} />
          {isEditable && (
            <button>
              <Image src={trash} alt="삭제" width={24} height={24} />
            </button>
          )}
        </div>
      </div>
      {/* 날짜 체크박스 추가 */}
      <MapRender latitude={latitude} longitude={longitude} />
      <ul className="pb-[72px]">
        <DayItem day="1일" isEditable={isEditable} />
        <DayItem day="2일" isEditable={isEditable} />
      </ul>
    </>
  );
}
