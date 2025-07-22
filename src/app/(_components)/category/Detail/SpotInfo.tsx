import Image from 'next/image';
import Link from 'next/link';
import call from '/public/images/icons/spot/call.svg';
import home from '/public/images/icons/spot/home.svg';
import location from '/public/images/icons/spot/location.svg';
import reservation from '/public/images/icons/spot/reservation.svg';
import time from '/public/images/icons/spot/time.svg';

export default function SpotInfo() {
  return (
    <ul className="mt-[16px] px-[16px]">
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={location} alt="장소" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">장소</p>
        </div>
        <p className="mt-[5px] text-xs text-g1 tracking-[-2%]">대구 중구 교동1길 16 3층 우측호수</p>
      </li>
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={time} alt="운영시간" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">운영시간</p>
        </div>
        <p className="mt-[5px] text-xs text-g1 tracking-[-2%]">매일 9:00 - 20:00</p>
      </li>
      <li className="py-[12px] border-b border-g4">
        <div className="flex items-center gap-[4px]">
          <Image src={call} alt="문의" width={14} height={14} />
          <p className="text-b3 text-sm tracking-[-2%]">문의</p>
        </div>
        <Link href={`tel:05312345678`} className="mt-[5px] text-xs text-g1 tracking-[-2%]">
          053-1234-5678
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
