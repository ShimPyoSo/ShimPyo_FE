import { ISpot } from '@/app/(_utils)/type';
import Image from 'next/image';
import Link from 'next/link';
import call from '/public/images/icons/spot/call.svg';
import dynamic from 'next/dynamic';
import home from '/public/images/icons/spot/home.svg';
import location from '/public/images/icons/spot/location.svg';
import reservation from '/public/images/icons/spot/reservation.svg';
import time from '/public/images/icons/spot/time.svg';

const MapRender = dynamic(() => import('../../spot/MapRender'), {
  ssr: false,
});

export default function SpotInfo({ spot }: { spot: ISpot }) {
  return (
    <ul className="mt-[16px] px-[16px]">
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={location} alt="장소" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">장소</p>
        </div>
        <p className="mt-[5px] mb-[12px] text-xs text-g1 tracking-[-2%]">{spot.address || '정보 없음'}</p>
        {spot.latitude !== undefined && spot.longitude !== undefined && (
          <MapRender latitude={spot.latitude} longitude={spot.longitude} />
        )}
      </li>
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={time} alt="운영시간" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">운영시간</p>
        </div>
        <p className="mt-[5px] text-xs text-g1 tracking-[-2%]">{spot.operationTime}</p>
      </li>
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={call} alt="문의" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">문의</p>
        </div>
        <Link href={`tel:05312345678`} className="mt-[5px] text-xs text-g1 tracking-[-2%]">
          {spot.tel}
        </Link>
      </li>
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={home} alt="장소안내" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">장소안내</p>
        </div>
        <Link
          href={'/'}
          className="mt-[5px] text-xs text-g1 tracking-[-2%] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          공식 사이트 확인하기
        </Link>
      </li>
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={reservation} alt="예약" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">예약</p>
        </div>
        <Link
          href={'/'}
          className="mt-[5px] text-xs text-g1 tracking-[-2%] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          예약 사이트 확인하기
        </Link>
      </li>
    </ul>
  );
}
