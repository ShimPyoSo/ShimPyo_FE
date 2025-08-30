'use client';

import BottomSheet from '../../UI/BottomSheet';
import CourseSpotContent from './CourseSpotContent';
import { ICourse } from '@/app/(_utils)/type';
import { useState } from 'react';

interface AddSpotProps {
  course: ICourse;
  setCourse?: React.Dispatch<React.SetStateAction<ICourse | null>>;
}

export default function AddSpot({ course, setCourse }: AddSpotProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  return (
    <>
      <button className="flex justify-end bg-w2 border border-w4 rounded-md px-[10px] py-[6px] text-b2 text-xs tracking-[-0.02em]">
        장소 추가하기
      </button>
      <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
        <CourseSpotContent course={course} setCourse={setCourse} onClose={() => setIsBottomSheetOpen(false)} />
      </BottomSheet>
    </>
  );
}
