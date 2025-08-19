'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';
import cancel from '/public/images/icons/cancel.svg';

interface ImageModalProps {
  reviewImg: string[];
  setReviewImg: React.Dispatch<React.SetStateAction<string[] | null>>;
  selectedNumber: number;
}

export default function ImageModal({ reviewImg, setReviewImg, selectedNumber }: ImageModalProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(selectedNumber);
  }, [selectedNumber]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="relative bg-black/70 w-[375px] h-full" onClick={() => setReviewImg(null)}>
        <button className="absolute top-[20px] right-[16px]" onClick={() => setReviewImg(null)}>
          <Image src={cancel} alt="닫기" width={24} height={24} />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="flex items-center gap-[12px]">
            <Image
              className="-rotate-90 cursor-pointer"
              src={arrow}
              alt="이전 이미지"
              width={30}
              height={30}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((prev) => (prev > 0 ? prev - 1 : reviewImg.length - 1));
              }}
              role="button"
            />
            <div className="relative w-[300px] h-[360px]">
              <Image src={reviewImg[current]} alt="리뷰 이미지" fill className="object-contain" />
            </div>

            <Image
              className="rotate-90 cursor-pointer"
              src={arrow}
              alt="다음 이미지"
              width={30}
              height={30}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((prev) => (prev < reviewImg.length - 1 ? prev + 1 : 0));
              }}
              role="button"
            />
          </div>
          <p className="mt-[12px] text-white">
            {current + 1}/{reviewImg.length}
          </p>
        </div>
      </div>
    </div>
  );
}
