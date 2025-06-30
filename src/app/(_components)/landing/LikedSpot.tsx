import Carousel from './Carousel';
import SpotItem from './SpotItem';

export default function LikedSpot() {
  return (
    <section className="mt-[70px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">쉼표 찍은 여행지</h3>
      <p className="mt-[2px] text-sm text-g1 mb-[16px]">내가 가고 싶은 여행지를 확인해 보세요</p>
      <Carousel>
        <div className="flex gap-[12px] flex-nowrap w-max">
          <SpotItem />
          <SpotItem />
          <SpotItem />
          <SpotItem />
          <SpotItem />
          <SpotItem />
        </div>
      </Carousel>
    </section>
  );
}
