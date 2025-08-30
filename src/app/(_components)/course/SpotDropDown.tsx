'use client';

import BottomSheet from '../UI/BottomSheet';
import CourseSpotContent from './bottomSheet/CourseSpotContent';
import { ICourse } from '@/app/(_utils)/type';
import Image from 'next/image';
import dropdown from '/public/images/icons/spot/dropdown.svg';
import { useState } from 'react';

interface SpotDropDownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  course?: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
  idx: number;
  day: string;
}

export default function SpotDropDown({ isOpen, setIsOpen, course, setCourse, idx, day }: SpotDropDownProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleDelete = () => {
    if (!setCourse) return;

    setCourse((prev) => {
      if (!prev) return null;

      const updatedDays = prev.days.map((d) => {
        if (d.date !== day) return d;

        const updatedList = [...d.list];
        updatedList.splice(idx, 1);

        return { ...d, list: updatedList };
      });

      return { ...prev, days: updatedDays };
    });

    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="p-1">
          <Image src={dropdown} alt="메뉴" width={20} height={20} />
        </button>

        {isOpen && (
          <div className="absolute top-[22px] right-0 mt-2 w-[47px] rounded-md bg-white shadow-lg z-50 shadow-[0px_3px_8px_0px_#0000001A]">
            <ul className="text-xs text-b1 text-center">
              <li className="py-[2px] border-b border-[#EFF0F2]">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  수정
                </button>
              </li>
              <li className="py-[2px]">
                <button onClick={handleDelete} className="w-full">
                  삭제
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <CourseSpotContent
          course={course!}
          setCourse={setCourse}
          onClose={() => setIsBottomSheetOpen(false)}
          spot={course!.days.find((d) => d.date === day)?.list[idx]}
          date={day}
          idx={idx}
        />
      </BottomSheet>
    </>
  );
}
