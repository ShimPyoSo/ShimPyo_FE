import SpotItem from '@/app/(_components)/mypage/review/SpotItem';

export default function Review() {
  return (
    <div className="min-h-full bg-w1 px-[16px] pt-[16px]">
      <section className="mb-[40px]">
        <p className="text-b3 text-sm tracking-[-2%]">이번달</p>
        <ul className="mt-[8px]">
          <SpotItem />
          <SpotItem />
          <SpotItem />
        </ul>
      </section>
      <section className="mb-[40px]">
        <p className="text-b3 text-sm tracking-[-2%]">7월</p>
        <ul className="mt-[8px]">
          <SpotItem />
          <SpotItem />
          <SpotItem />
        </ul>
      </section>
    </div>
  );
}
