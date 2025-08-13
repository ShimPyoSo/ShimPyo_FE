'use client';

import Alert from '@/app/(_components)/UI/Alert';
import { ICourse } from '@/app/(_utils)/type';
import RecommendCourse from '@/app/(_components)/test/RecommendCourse';
import Result from '@/app/(_components)/test/Result.';
import { useState } from 'react';

export default function TestResults() {
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState<ICourse | null>(null);

  return (
    <>
      <div className="bg-w1">
        {course ? <RecommendCourse setIsOpen={setIsOpen} course={course} /> : <Result setCourse={setCourse} />}
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
