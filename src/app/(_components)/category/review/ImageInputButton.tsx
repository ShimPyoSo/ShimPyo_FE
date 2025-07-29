'use client';

import Image from 'next/image';
import camera from '/public/images/icons/camera.svg';
import { useRef } from 'react';

interface ImageInputProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageInputButton({ images, setImages }: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = () => {
    if (images.length < 8) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 추후 이미지 업로드 구현 시 실제 이미지 추가 예정
    const newImageId = String(Date.now());
    setImages((prev) => [...prev, newImageId]);

    e.target.value = '';
  };

  return (
    <>
      <button
        type="button"
        className="w-[105px] h-[105px] border border-g3 border-dashed rounded-lg flex flex-col items-center justify-center"
        onClick={handleAddImage}
      >
        <Image className="mb-[4px]" src={camera} alt="이미지" width={24} height={24} />
        <p className="text-g1 text-xs">사진 업로드</p>
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </>
  );
}
