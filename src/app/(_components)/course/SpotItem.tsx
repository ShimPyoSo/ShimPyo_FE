'use client';

import { ICourse, ICourseList } from '@/app/(_utils)/type';

import Image from 'next/image';
import SpotDropDown from './SpotDropDown';
import location from '/public/images/icons/spot/location.svg';
import spotDefault from '/public/images/icons/course/spotDefault.svg';
import tel from '/public/images/icons/spot/call.svg';
import { useState } from 'react';

interface SpotItemProps {
  isEditable: boolean;
  isPreview: boolean;
  onDelete?: () => void;
  spot: ICourseList;
  course?: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
  idx?: number;
  day?: string;
}

export default function SpotItem({
  isEditable,
  isPreview,
  onDelete,
  spot,
  course,
  setCourse,
  idx,
  day,
}: SpotItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="grow h-[98px] bg-white rounded-lg py-[12px] px-[8px] flex items-center">
      <div className="w-[128px] h-full bg-w1 rounded-md relative">
        <Image className="py-[15px] px-[20px]" src={spotDefault} alt="관광지 이미지" fill />
      </div>
      <div className="ml-[7px] h-full grow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-b1 tracking-[-0.02em]">{spot.title}</p>
          {isEditable ? (
            <SpotDropDown
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              course={course}
              setCourse={setCourse}
              idx={idx as number}
              day={day as string}
            />
          ) : isPreview ? (
            <button
              className="bg-w2 border border-w4 rounded-md px-[6px] py-[2px] text-xs text-b2 tracking-[-0.02em]"
              onClick={onDelete}
            >
              삭제하기
            </button>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className="flex items-center gap-[4px]">
            <Image src={location} alt="위치" width={11} height={11} />
            <p className="text-xs text-g1 line-clamp-1">{spot.address}</p>
          </div>
          <div className="flex items-center gap-[4px]">
            <Image src={tel} alt="전화번호" width={11} height={11} />
            <p className="text-xs text-g1 line-clamp-1">{spot.tel}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
