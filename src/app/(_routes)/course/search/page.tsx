'use client';

import BottomSheet from '@/app/(_components)/UI/BottomSheet';
import CourseSpotContent from '@/app/(_components)/course/CourseSpotContent';
import { useState } from 'react';

export default function SpotSearch() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <BottomSheet isOpen={isOpen} onClose={handleClose}>
        <CourseSpotContent />
      </BottomSheet>
    </div>
  );
}
