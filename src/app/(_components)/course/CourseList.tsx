'use client';

import DayItem from './DayItem';
import { ILatLng } from '@/app/(_utils)/type';
import Image from 'next/image';
import Map from './Map';
import Share from '../UI/Share';
import trash from '/public/images/icons/course/trash.svg';

interface CourseListProps {
  isEditable: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CourseList({ isEditable, setIsOpen }: CourseListProps) {
  const tempPositionsGroup: ILatLng[][] = [
    [
      { latitude: 37.5665, longitude: 126.978 }, // 서울 시청
      { latitude: 37.5651, longitude: 126.98955 }, // 종각역
      { latitude: 37.57, longitude: 126.9768 }, // 경복궁
    ],
    [
      { latitude: 35.1796, longitude: 129.0756 }, // 부산
      { latitude: 35.1601, longitude: 129.0726 }, // 해운대
      { latitude: 35.1478, longitude: 129.0481 }, // 광안리
    ],
  ];

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
      <Map positions={tempPositionsGroup} day={2} />
      <ul className="pb-[72px]">
        <DayItem day="1일" isEditable={isEditable} />
        <DayItem day="2일" isEditable={isEditable} />
      </ul>
    </>
  );
}
