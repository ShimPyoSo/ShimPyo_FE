'use client';

import { ICourseList } from '@/app/(_utils)/type';

interface CourseAddButtonProps {
  selectedSpot: ICourseList | null;
  type: 'search' | 'kakao';
}

export default function CourseAddButton({ selectedSpot, type }: CourseAddButtonProps) {
  const handleAdd = () => {
    if (!selectedSpot || !window.opener) return;

    const spotToSend = {
      ...selectedSpot,
      touristId: type === 'kakao' ? -1 : selectedSpot.touristId,
      type: type === 'kakao' ? 'CUSTOM' : 'TOURIST',
    };

    window.opener.postMessage(spotToSend, window.location.origin);
    window.close();
  };

  return (
    <div className="fixed bottom-[20px] flex justify-center z-[999]">
      <button
        className={`w-[343px] py-[16px] border font-semibold rounded-lg ${
          selectedSpot ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
        }`}
        disabled={!selectedSpot}
        onClick={handleAdd}
      >
        여행지 추가하기
      </button>
    </div>
  );
}
