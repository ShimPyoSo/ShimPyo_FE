'use client';

import Image from 'next/image';
import ImageItem from './ImageItem';
import camera from '/public/images/icons/camera.svg';
import { useState } from 'react';

export default function ImageList() {
  const [images, setImages] = useState<number[]>([]);

  const handleAddImage = () => {
    if (images.length < 8) {
      setImages((prev) => [...prev, Date.now()]); // 임시 이미지 추가 코드 추후 수정
    }
  };

  return (
    <section className="mt-[60px] tracking-[-2%]">
      <span className="text-gn1 text-sm flex items-baseline">
        <p className="font-[kkubulim] text-lg">사진 업로드</p>(선택)
      </span>
      <small className="text-sm text-g1">여행지를 실감나게 보여주는 사진을 업로드해 주세요</small>

      <ul className="mt-[16px] grid grid-cols-3 gap-y-[12px] gap-x-[12px]">
        <li>
          <button
            type="button"
            className="w-[105px] h-[105px] border border-g3 border-dashed rounded-lg flex flex-col items-center justify-center"
            onClick={handleAddImage}
          >
            <Image className="mb-[4px]" src={camera} alt="이미지" width={24} height={24} />
            <p className="text-g1 text-xs">사진 업로드</p>
          </button>
        </li>

        {images.map((id) => (
          <ImageItem key={id} />
        ))}
      </ul>
    </section>
  );
}
