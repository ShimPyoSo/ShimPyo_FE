import { CAROUSEL } from '@/app/(_utils)/constants';
import Carousel from '../UI/MobileCarousel';
import Image from 'next/image';
import Link from 'next/link';

export default function MainSlider() {
  return (
    <Carousel autoplay={true}>
      <div className="flex gap-[10px] flex-nowrap w-max pr-[16px]">
        {CAROUSEL.map((item, idx) => (
          <Link
            key={idx}
            className="w-[343px] h-[142px] rounded-xl bg-white border border-w4 relative"
            href={item.url}
            target={idx > 1 ? '_blank' : undefined}
            rel={idx > 1 ? 'noopener noreferrer' : undefined}
          >
            <Image className="rounded-xl object-cover" src={item.image} alt="메인" fill />
            <div className="rounded-xl absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute left-[10px] bottom-[10px]">
              <p className="tracking-[-0.02em] text-xs text-g4 font-medium">{item.title}</p>
              <span className="font-semibold text-sm text-white tracking-[-0.02em]">
                {item.first}
                <br />
                <span className="flex">
                  <p className="text-gn10">{item.accent}</p>
                  {item.second}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Carousel>
  );
}
