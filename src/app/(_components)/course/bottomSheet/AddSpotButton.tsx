'use client';

import { ICourseAddition, ICourseList } from '@/app/(_utils)/type';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import SpotDetailComponent from '../../category/Detail/SpotDetailComponent';

interface SpotRecommendProps {
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
  detailId: number;
  selectedSpot: ICourseAddition | ICourseList | null;
  setSelectedSpot: React.Dispatch<React.SetStateAction<ICourseList | null>> | UseFormSetValue<ICourseAddition>;
  watch?: UseFormWatch<ICourseAddition>;
  data: ICourseList[] | undefined | null;
}

export default function AddSpotButton({
  detailId,
  setDetailId,
  selectedSpot,
  setSelectedSpot,
  watch,
  data,
}: SpotRecommendProps) {
  const handleAddSpot = () => {
    if (!data) return;
    const selected = data.find((spot) => spot.touristId === detailId);
    if (!selected) return;

    const selectedValue: ICourseAddition | ICourseList =
      setSelectedSpot.length === 1
        ? { ...selected, time: watch?.('course.time') } // ICourseList 타입
        : { ...selected, time: watch?.('course.time') }; // ICourseAddition 타입

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (setSelectedSpot as any)(selectedValue);
    setDetailId(0);

    handleClosePopup(selectedValue);
  };

  const handleClosePopup = (value?: ICourseList | ICourseAddition) => {
    const sendValue = value || selectedSpot;
    if (!sendValue || !window.opener) return;

    window.opener.postMessage(sendValue, window.location.origin);
    window.close();
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
