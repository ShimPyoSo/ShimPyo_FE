'use client';

import { Suspense, useEffect, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import ShareCourse from '@/app/(_components)/course/ShareCourse';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';

export default function CourseShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('맞춤 쉼표 코스');
  }, [setTitle]);

  return (
    <Suspense>
      <ShareCourse setIsOpen={setIsOpen} />
      {isOpen && (
        <Alert
          title="링크 복사"
          description={'여행지 링크를 복사했어요🔗\n함께 여행하고 싶은 친구에게 공유해 보세요'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </Suspense>
  );
}
