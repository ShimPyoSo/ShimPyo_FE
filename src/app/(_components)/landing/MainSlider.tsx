import Carousel from '../UI/MobileCarousel';

export default function MainSlider() {
  return (
    <Carousel>
      <div className="flex gap-[10px] flex-nowrap w-max pr-[16px]">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="w-[232px] h-[142px] rounded-xl bg-white border border-gray-300" />
        ))}
      </div>
    </Carousel>
  );
}
