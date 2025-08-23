'use client';

import { useEffect, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import { ICourse } from '@/app/(_utils)/type';
import LikeCourseList from '@/app/(_components)/course/LikeCourseList';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

const tempCourse: ICourse = {
  courseId: 1,
  title: '전남 템플스테이 체험',
  typename: '비우는 쉼표',
  token: uuidv4(),
  days: [
    {
      date: '1일',
      list: [
        {
          touristId: 101,
          title: '템플스테이 사찰 체험',
          time: '09:00',
          images: 'https://example.com/images/spot1.jpg',
          address: '전라남도 순천시 송광면',
          operationTime: {
            dayoff: ['월요일'],
            openTime: '09:00',
            closeTime: '18:00',
            breakTime: '12:00~13:00',
          },
          latitude: 34.965,
          longitude: 127.489,
        },
        {
          touristId: 102,
          title: '전남 자연 힐링 산책',
          time: '10:00',
          images: 'https://example.com/images/spot2.jpg',
          address: '전라남도 담양군 메타세쿼이아길',
          operationTime: {
            dayoff: null,
            openTime: '08:00',
            closeTime: '20:00',
            breakTime: null,
          },
          latitude: 35.318,
          longitude: 126.993,
        },
      ],
    },
    {
      date: '2일',
      list: [
        {
          touristId: 103,
          title: '전남 전통 사찰 음식 체험',
          time: '12:00',
          images: 'https://example.com/images/spot3.jpg',
          address: '전라남도 화순군 사찰 음식 체험관',
          operationTime: {
            dayoff: ['화요일'],
            openTime: '10:00',
            closeTime: '17:00',
            breakTime: '12:30~13:30',
          },
          latitude: 35.065,
          longitude: 126.964,
        },
      ],
    },
  ],
};

export default function LikedCourse() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('맞춤 쉼표 코스');
  }, [setTitle]);

  return (
    <>
      <div className="bg-w1 px-[16px] pb-[70px]">
        <LikeCourseList course={tempCourse} setIsOpen={setIsOpen} />
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
