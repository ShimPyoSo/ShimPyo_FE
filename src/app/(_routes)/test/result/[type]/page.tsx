'use client';

import Alert from '@/app/(_components)/UI/Alert';
import { ICourse } from '@/app/(_utils)/type';
import ProtectedRoute from '@/app/ProtectedRoute';
import RecommendCourse from '@/app/(_components)/test/RecommendCourse';
import Result from '@/app/(_components)/test/Result.';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useState } from 'react';

export default function TestResults() {
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    if (course) {
      setTitle('맞춤 쉼표 코스');
    } else {
      setTitle('쉼표 유형 테스트');
    }
  }, [setTitle, course]);

  return (
    <ProtectedRoute>
      <div className="bg-w1">
        {course ? <RecommendCourse setIsOpen={setIsOpen} course={course} /> : <Result setCourse={setCourse} />}
      </div>
      {isOpen && (
        <Alert
          title="링크 복사"
          description={'여행지 링크를 복사했어요🔗\n함께 여행하고 싶은 친구에게 공유해 보세요'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </ProtectedRoute>
  );
}
