'use client';

import Image from 'next/image';
import { RefObject } from 'react';
import arrow from '/public/images/icons/arrow.svg';

interface WebCarouselArrowProps {
  scrollRef: RefObject<HTMLDivElement | null>;
  scrollStep: number;
}

export default function WebCarouselArrow({ scrollRef, scrollStep }: WebCarouselArrowProps) {
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -1 * scrollStep, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: scrollStep, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center">
      <Image
        src={arrow}
        alt="왼쪽"
        width={26}
        height={26}
        className="-rotate-90 cursor-pointer"
        role="button"
        onClick={scrollLeft}
      />
      <Image
        src={arrow}
        alt="오른쪽"
        width={26}
        height={26}
        className="rotate-90 cursor-pointer"
        role="button"
        onClick={scrollRight}
      />
    </div>
  );
}
