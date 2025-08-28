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
          description={'여행지 링크가 복사되었습니다.\n친구에게 공유해 보세요.'}
          confirmText="확인"
          setIsOpen={setIsOpen}
          onConfirm={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
