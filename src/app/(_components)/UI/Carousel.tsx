import { ReactNode, forwardRef } from 'react';

import MobileCarousel from './MobileCarousel';
import WebCarousel from '../UI/WebCarousel';
import { isMobile } from 'react-device-detect';

interface CarouselProps {
  children: ReactNode;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({ children }, ref) => {
  return isMobile ? <MobileCarousel>{children}</MobileCarousel> : <WebCarousel ref={ref}>{children}</WebCarousel>;
});

Carousel.displayName = 'Carousel';
export default Carousel;
