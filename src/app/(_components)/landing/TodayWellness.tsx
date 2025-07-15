import CurrentLocation from './CurrentLocation';
import Image from 'next/image';
import gps from '/public/images/icons/gps.svg';

export default function TodayWellness() {
  return (
    <section className="mt-[70px] pr-[16px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">오늘 웰니스 지수</h3>
      <div className="mt-[2px] flex items-center gap-[4px]">
        <Image src={gps} alt="위치" width={16} height={16} />
        <CurrentLocation />
      </div>

      <ul className="mt-[16px] w-full flex items-center justify-between px-[10px] py-[20px] bg-gn11 rounded-xl">
        <li className="flex flex-col items-center text-xs">
          <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px]"></div>
          <p className="mt-[12px] text-g1 tracking-[-2%]">날씨</p>
          <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">23°</p>
        </li>
        <li className="flex flex-col items-center text-xs">
          <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px]"></div>
          <p className="mt-[12px] text-g1 tracking-[-2%]">강수량</p>
          <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">30%</p>
        </li>
        <li className="flex flex-col items-center text-xs">
          <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px]"></div>
          <p className="mt-[12px] text-g1 tracking-[-2%]">미세먼지</p>
          <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">좋음</p>
        </li>
        <li className="flex flex-col items-center text-xs">
          <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px]"></div>
          <p className="mt-[12px] text-g1 tracking-[-2%]">자외선지수</p>
          <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">보통</p>
        </li>
        <li className="flex flex-col items-center text-xs">
          <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px]"></div>
          <p className="mt-[12px] text-g1 tracking-[-2%]">번잡도</p>
          <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">낮음</p>
        </li>
      </ul>
    </section>
  );
}
