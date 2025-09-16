'use client';

import { useEffect, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import LikeCourseList from '@/app/(_components)/course/LikeCourseList';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';

export default function LikedCourse() {
  const [isOpen, setIsOpen] = useState(false);
  const [titleLength, setTitleLength] = useState(false);
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('맞춤 쉼표 코스');
  }, [setTitle]);

  return (
    <>
      <div className="bg-w1 px-[16px]">
        <LikeCourseList setIsOpen={setIsOpen} setTitleLength={setTitleLength} />
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
      {titleLength && (
        <Alert
          title="코스 이름 오류"
          description={'코스 이름은 최소 2글자에서 최대 15자 이내로 설정할 수 있어요'}
          confirmText="확인"
          setIsOpen={setTitleLength}
          onConfirm={() => setTitleLength(false)}
        />
      )}
    </>
  );
}
