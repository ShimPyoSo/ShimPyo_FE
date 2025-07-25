'use client';

import Image from 'next/image';
import arrow from '/public/images/icons/arrow.svg';
import cancel from '/public/images/icons/cancel.svg';
import { useEffect } from 'react';

interface ImageModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageModal({ setIsOpen }: ImageModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="relative bg-black/70 w-[375px] h-full" onClick={() => setIsOpen(false)}>
        <button className="absolute top-[20px] right-[16px]" onClick={() => setIsOpen(false)}>
          <Image src={cancel} alt="닫기" width={24} height={24} />
        </button>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="flex items-center gap-[12px]">
            <Image className="-rotate-90" src={arrow} alt="이전 이미지" width={30} height={30} />
            <Image className="rotate-90" src={arrow} alt="다음 이미지" width={30} height={30} />
          </div>
          <p className="mt-[12px] text-white">3/8</p>
        </div>
      </div>
    </div>
  );
}
