'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export default function MobileCarousel({ children, autoplay = false }: { children: ReactNode; autoplay?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const itemWidth = 353;

  useEffect(() => {
    if (!autoplay) return;
    const el = scrollRef.current;
    if (!el) return;

    const scrollStep = () => {
      const currentIndex = Math.round(el.scrollLeft / itemWidth);
      let nextIndex = currentIndex + 1;

      if (nextIndex * itemWidth >= el.scrollWidth - el.clientWidth) {
        nextIndex = 0;
      }

      el.scrollTo({
        left: nextIndex * itemWidth,
        behavior: 'smooth',
      });
    };

    const timer = setInterval(scrollStep, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!isDragging || !el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX;
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const el = scrollRef.current;
    if (!el) return;

    const nearestIndex = Math.round(el.scrollLeft / itemWidth);
    el.scrollTo({
      left: nearestIndex * itemWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide cursor-grab select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {children}
    </div>
  );
}
