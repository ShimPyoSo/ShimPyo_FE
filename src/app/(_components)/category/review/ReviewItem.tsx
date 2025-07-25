'use client';

import { useState } from 'react';

export default function ReviewItem() {
  const [isMore, setIsMore] = useState(false);
  const [hasImage, setHasImage] = useState(false); // UI용 임시 state 추후 삭제

  const handleImage = () => {
    setHasImage(!hasImage); // 빌드 오류 방지용 임시 코드 추후 삭제
  };

  return (
    <li className="p-[12px] bg-[#fbfbfb] border-w4 rounded-xl tracking-[-2%]" onClick={handleImage}>
      <div className="flex items-center justify-between mb-[8px]">
        <p className="font-semibold text-sm text-b1">쉼표1</p>
        <p className="text-xs text-g1">2025.06.24</p>
      </div>
      <p className={`text-xs text-b3 leading-[1.6] ${isMore ? '' : 'line-clamp-4'}`}>
        우선 사진과 똑같이 잘 꾸며져있고 가격 대비 만족도가 너무 좋았어요! 사진과 같이 예쁜 소품들과 빔프로젝터가 있어서
        분위기 내기에도 좋았고, 제가 정말 기계치인데 빔프로젝터 연결 방법도 정말 어렵지 않아서 최애 영화 한 편 즐겁게
        감상했습니다. 새로 오픈한 숙소인 거 같은데 해운대 쪽 여행 생각 중이신 분께 추천드려요! 숙소를 이곳으로 결정한 게
        위치나 다른 것보다 가격이 가장 컸는데 버스 정류장이나 지하철역도 가까워서 이동도 생각보다 굉장히 편했습니다!
        정말 깔끔하고 소품들도 정성스럽게 꾸며놓으신 티가 났어요 덕분에 정말 행복한 하루 보냈습니다 ㅎㅎ
      </p>
      <button className="mt-[6px] text-xs text-g1 underline" onClick={() => setIsMore(!isMore)}>
        {isMore ? '접기' : '더보기'}
      </button>
      {hasImage && (
        <section className="mt-[16px] flex items-center">
          <ul className="flex items-center gap-[6px]">
            <li className="w-[50px] h-[56px] rounded-sm bg-w1"></li>
            <li className="w-[50px] h-[56px] rounded-sm bg-w1"></li>
            <li className="w-[50px] h-[56px] rounded-sm bg-w1"></li>
            <li className="w-[50px] h-[56px] rounded-sm bg-w1"></li>
            <li className="w-[50px] h-[56px] rounded-sm bg-w1"></li>
          </ul>
          <div className="ml-[8px] py-[2px] px-[6px] rounded-[80px] bg-w1 border border-w4 text-xs text-b3">+ 8</div>
        </section>
      )}
    </li>
  );
}
