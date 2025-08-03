import Image from 'next/image';
import WeeklyWellness from './WeeklyWellnes';
import gps from '/public/images/icons/gps.svg';

export default function Wellness() {
  return (
    <section className="mt-[60px] px-[16px]">
      <p className="font-[kkubulim] text-lg text-gn1 tracking-[-2%]">이번주 웰니스 지수</p>
      <div className="mt-[2px] flex items-center gap-[4px]">
        <Image src={gps} alt="위치" width={16} height={16} />
        <p className="text-sm text-g1">대구 중구 교동1길 16 3층 우측호수</p>
      </div>
      <WeeklyWellness />
    </section>
  );
}
