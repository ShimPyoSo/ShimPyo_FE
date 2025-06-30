import Carousel from './Carousel';
import SpotItem from './SpotItem';

export default function Recommend() {
  return (
    <section className="mt-[70px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">여행지 추천</h3>
      <p className="mt-[2px] text-sm text-g1 mb-[16px]">좋아하실 만한 여행지를 추천해 드려요</p>
      <Carousel>
        <div className="pr-[16px] flex gap-[12px] flex-nowrap w-max">
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
