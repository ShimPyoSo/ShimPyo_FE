'use client';

import Alert from '@/app/(_components)/UI/Alert';
import SpotDetailComponent from '@/app/(_components)/category/Detail/SpotDetailComponent';
import { useParams } from 'next/navigation';
import { useRecentSpots } from '@/app/(_utils)/hooks/useRecentSpots';
import { useState } from 'react';

export default function SpotDetail() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  useRecentSpots();

  return (
    <>
      <SpotDetailComponent setIsOpen={setIsOpen} id={Number(id)} type="detail" />
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
