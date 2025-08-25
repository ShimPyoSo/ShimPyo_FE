import { forwardRef } from 'react';

const WebCarousel = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} className="overflow-x-auto scrollbar-hide">
    {children}
  </div>
));

WebCarousel.displayName = 'WebCarousel';
export default WebCarousel;
