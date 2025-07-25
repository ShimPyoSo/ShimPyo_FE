'use client';

import { useState } from 'react';

interface ReviewItemProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewItem({ setIsOpen }: ReviewItemProps) {
  const [hasImage, setHasImage] = useState(false); // UI용 임시 state 추후 삭제

  const handleImage = () => {
    setHasImage(!hasImage); // 빌드 오류 방지용 임시 코드 추후 삭제
  };

  return (
    <li
      className="w-[280px] h-[186px] p-[16px] rounded-lg border border-w4 bg-[#fbfbfb] tracking-[-2%]"
      onClick={handleImage}
    >
      <div className="flex items-center justify-between mb-[8px]">
        <p className="text-sm text-b1 font-semibold">쉼표1</p>
        <p className="text-xs text-g1">2025.06.24</p>
      </div>
      <p className={`text-xs text-b3 ${hasImage ? 'line-clamp-3' : 'line-clamp-7'}`}>
        요가 선생님이 친절하시고 강의력이 좋으세요~ 강사님 부모님께서 제주서 직접 재배하신 향긋한 차도 마시면서 건강하고
        즐거운 하루를 보냈네요. 대구에 오시면 꼭 한 번 들러보세요. 요가 선생님이 친절하시고 강의력이 좋으세요~ 강사님
        부모님께서 제주서 직접 재배하신 향긋한 차도 마시면서 건강하고 즐거운 하루를 보냈네요. 대구에 오시면 꼭 한 번
        들러보세요. 요가 선생님이 친절하시고 강의력이 좋으세요~ 강사님 부모님께서 제주서 직접 재배하신 향긋한 차도
        마시면서 건강하고 즐거운 하루를 보냈네요. 대구에 오시면 꼭 한 번 들러보세요. 요가 선생님이 친절하시고 강의력이
        좋으세요~ 강사님 부모님께서 제주서 직접 재배하신 향긋한 차도 마시면서 건강하고 즐거운 하루를 보냈네요. 대구에
        오시면 꼭 한 번 들러보세요. 요가 선생님이 친절하시고 강의력이 좋으세요~ 강사님 부모님께서 제주서 직접 재배하신
        향긋한 차도 마시면서 건강하고 즐거운 하루를 보냈네요. 대구에 오시면 꼭 한 번 들러보세요.
      </p>

      {hasImage && (
        <ul className="mt-[16px] flex items-center gap-[8px]">
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
          <li className="w-[56px] h-[62px] rounded-sm bg-w1" onClick={() => setIsOpen(true)}></li>
        </ul>
      )}
    </li>
  );
}
