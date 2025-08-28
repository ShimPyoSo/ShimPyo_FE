'use client';

import BottomSheet from '@/app/(_components)/UI/BottomSheet';
import CourseSpotContent from '@/app/(_components)/course/CourseSpotContent';
import { useState } from 'react';

export default function SpotSearch() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  return (
    <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)}>
      <CourseSpotContent />
    </BottomSheet>
  );
}
