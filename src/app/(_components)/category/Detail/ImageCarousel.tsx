'use client';

import Image from 'next/image';

interface ImageCarouselProps {
  images?: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <>
      {images && images[0] && (
        <div className="mt-[30px] h-[206px] mx-[16px] bg-white border border-w4 rounded-2xl relative overflow-hidden">
          <div className="flex-shrink-0 w-full h-full">
            <Image src={images[0]} alt="carousel" fill className="object-cover rounded-2xl" sizes="400px" />
          </div>
        </div>
      )}
    </>
  );
}
