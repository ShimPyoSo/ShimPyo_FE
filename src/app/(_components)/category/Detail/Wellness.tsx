import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import WeeklyWellness from './WeeklyWellnes';
import gps from '/public/images/icons/gps.svg';

export default function Wellness({ spot, type }: { spot: ISpot; type: 'course' | 'detail' }) {
  return (
    <section className="mt-[60px] px-[16px]">
      <p className="font-[kkubulim] text-lg text-gn1 tracking-[-0.02em]">이번주 웰니스 지수</p>
      <div className="mt-[2px] flex items-center gap-[4px]">
        <Image src={gps} alt="위치" width={16} height={16} />
        <p className="text-sm text-g1 max-w-[340px] truncate">{spot.address}</p>
      </div>
      <WeeklyWellness
        type={type}
        latitude={spot.latitude as number}
        longitude={spot.longitude as number}
        address={spot.address as string}
        name={spot.title}
        dayOff={spot.calcTime ? spot.calcTime.split(', ').map((d) => d.trim()) : []}
      />
    </section>
  );
}
