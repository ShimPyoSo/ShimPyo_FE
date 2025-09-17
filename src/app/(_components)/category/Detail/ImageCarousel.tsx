'use client';

import Image from 'next/image';

interface ImageCarouselProps {
  image?: string;
}

export default function ImageCarousel({ image }: ImageCarouselProps) {
  return (
    <>
      {image && (
        <div className="mt-[30px] h-[206px] mx-[16px] bg-white border border-w4 rounded-2xl relative overflow-hidden">
          <div className="flex-shrink-0 w-full h-full">
            <Image src={image} alt="carousel" fill className="object-cover rounded-2xl" />
          </div>
        </div>
      )}
    </>
  );
}
