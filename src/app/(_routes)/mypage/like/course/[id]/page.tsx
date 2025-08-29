'use client';

import { useEffect, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import LikeCourseList from '@/app/(_components)/course/LikeCourseList';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';

export default function LikedCourse() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('맞춤 쉼표 코스');
  }, [setTitle]);

  return (
    <>
      <div className="bg-w1 px-[16px] pb-[70px]">
        <LikeCourseList setIsOpen={setIsOpen} />
      </div>
      {isOpen && (
        <Alert
          title="링크 복사"
          description={'여행지 링크가 복사되었습니다.\n친구에게 공유해 보세요.'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
