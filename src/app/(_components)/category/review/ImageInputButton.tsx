'use client';

import Image from 'next/image';
import camera from '/public/images/icons/camera.svg';
import { useGetImageURL } from '@/app/(_utils)/hooks/useGetImageURL';
import { useRef } from 'react';

interface ImageInputProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageCountError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageInputButton({
  images,
  setImages,
  setIsImageError,
  setIsImageCountError,
  setIsLoading,
}: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { getImageURL } = useGetImageURL({ setIsImageError });

  const handleAddImage = () => {
    if (images.length < 8) {
      inputRef.current?.click();
    } else {
      setIsImageCountError(true);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 8) {
      setIsImageCountError(true);
      e.target.value = '';
      return;
    }

    setIsLoading(true);

    const fileArray = Array.from(files);

    const results = await Promise.all(fileArray.map((file) => getImageURL(file)));
    const validUrls = results.filter((url): url is string => Boolean(url));
    setImages((prev) => [...prev, ...validUrls]);

    e.target.value = '';
    setIsLoading(false);
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
      <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
    </>
  );
}
