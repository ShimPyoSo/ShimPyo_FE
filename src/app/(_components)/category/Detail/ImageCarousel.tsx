'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageCarouselProps {
  images?: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="mt-[30px] h-[206px] mx-[16px] bg-white border border-w4 rounded-2xl relative overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images?.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 w-full h-full relative">
            <Image src={src} alt={`carousel-${idx}`} fill className="object-cover rounded-2xl" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-[5px]">
        {images?.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-[5px] h-[5px] rounded-full ${idx === currentIndex ? 'bg-gn1' : 'bg-g3'}`}
          />
        ))}
      </div>
    </div>
  );
}
