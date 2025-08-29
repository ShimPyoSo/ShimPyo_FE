'use client';

import { Suspense, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import ShareCourse from '@/app/(_components)/course/ShareCourse';

export default function CourseShare() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Suspense>
      <ShareCourse setIsOpen={setIsOpen} />
      {isOpen && (
        <Alert
          title="링크 복사"
          description={'여행지 링크가 복사되었습니다.\n친구에게 공유해 보세요.'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </Suspense>
  );
}
