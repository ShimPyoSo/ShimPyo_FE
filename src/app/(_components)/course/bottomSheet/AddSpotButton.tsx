'use client';

import { ICourseAddition, ICourseList } from '@/app/(_utils)/type';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import SpotDetailComponent from '../../category/Detail/SpotDetailComponent';

interface SpotRecommendProps {
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  detailId: number;
  setSelectedSpot: React.Dispatch<React.SetStateAction<ICourseList | null>> | UseFormSetValue<ICourseAddition>;
  watch?: UseFormWatch<ICourseAddition>;
  data: ICourseList[] | undefined | null;
}

export default function AddSpotButton({ detailId, setDetailId, setSelectedSpot, watch, data }: SpotRecommendProps) {
  const handleAddSpot = () => {
    if (!data) return;
    const selected = data.find((spot) => spot.touristId === detailId);
    if (!selected) return;

    if (setSelectedSpot.length === 1) {
      (setSelectedSpot as React.Dispatch<React.SetStateAction<ICourseList | null>>)({
        ...selected,
        time: watch?.('course.time'),
      });
    } else {
      const currentTime = watch?.('course.time');
      (setSelectedSpot as UseFormSetValue<ICourseAddition>)('course', {
        ...selected,
        time: currentTime,
      });
    }
    setDetailId(0);
  };

  return (
    <>
      {detailId !== 0 && (
        <div className="mt-[24px] h-[400px] overflow-y-scroll relative">
          <SpotDetailComponent id={detailId} type="course" />
          <button
            className="sticky bottom-0 w-full py-[16px] rounded-lg border font-semibold bg-gn1 border-gn5 text-white z-[999]"
            onClick={handleAddSpot}
          >
            여행지 추가하기
          </button>
        </div>
      )}
    </>
  );
}
