'use client';

import Alert from '@/app/(_components)/UI/Alert';
import CourseItemList from '@/app/(_components)/course/CourseItemList';
import ProtectedRoute from '@/app/ProtectedRoute';
import { useState } from 'react';

export default function LikedCourseList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ProtectedRoute>
        <div className="bg-w1 px-[16px] py-[30px]">
          <h2 className="flex flex-col">
            <p className="font-semibold text-b1">내가 찜한 맞춤 쉼표 코스</p>
            <small className="mt-[4px] tracking-[-0.02em] text-g1 text-xs">
              내가 마음에 들어한 맞춤 쉼표 코스를 확인해 보세요.
            </small>
          </h2>
          <CourseItemList setIsOpen={setIsOpen} />
        </div>
      </ProtectedRoute>
      {isOpen && (
        <Alert
          title="링크 복사"
          description={'여행지 링크를 복사했어요🔗\n함께 여행하고 싶은 친구에게 공유해 보세요'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
