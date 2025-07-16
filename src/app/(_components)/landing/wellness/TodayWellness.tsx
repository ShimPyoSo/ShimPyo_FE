import CurrentLocation from './CurrentLocation';
import Image from 'next/image';
import WellnessFactor from './WellnessFactor';
import gps from '/public/images/icons/gps.svg';
import wellness from '/public/images/icons/wellness/wellness.svg';

export default function TodayWellness() {
  return (
    <section className="mt-[70px] pr-[16px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">오늘 웰니스 지수</h3>
      <div className="mt-[2px] flex items-center gap-[4px]">
        <Image src={gps} alt="위치" width={16} height={16} />
        <CurrentLocation />
      </div>

      <div className="mt-[40px]">
        <Image src={wellness} alt="wellness" width={344} height={150} />
      </div>
      <WellnessFactor />
    </section>
  );
}
