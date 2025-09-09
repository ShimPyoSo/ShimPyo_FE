import Facilities from './Facilities';
import { ISpot } from '@/app/(_utils)/type';
import Link from 'next/link';
import SpotInfoItem from './SpotInfoItem';
import call from '/public/images/icons/spot/call.svg';
import dynamic from 'next/dynamic';
import home from '/public/images/icons/spot/home.svg';
import location from '/public/images/icons/spot/location.svg';
import reservation from '/public/images/icons/spot/reservation.svg';
import service from '/public/images/icons/spot/service.svg';
import time from '/public/images/icons/spot/time.svg';

const MapRender = dynamic(() => import('../../spot/MapRender'), { ssr: false });

export default function SpotInfo({ spot }: { spot: ISpot }) {
  return (
    <ul className="mt-[16px] px-[16px]">
      <SpotInfoItem icon={location} label="장소">
        {spot.address || '정보 미제공'}
        {spot.latitude !== undefined && spot.longitude !== undefined && (
          <MapRender latitude={spot.latitude} longitude={spot.longitude} />
        )}
      </SpotInfoItem>

      <SpotInfoItem icon={time} label="운영시간">
        {`${spot.operationTime?.openTime} - ${spot.operationTime?.closeTime}`}
      </SpotInfoItem>

      <SpotInfoItem icon={call} label="문의">
        <Link href={`tel:${spot.tel}`} className="underline">
          {spot.tel}
        </Link>
      </SpotInfoItem>

      <SpotInfoItem icon={service} label="제공서비스">
        <Facilities services={spot.facilities} />
      </SpotInfoItem>

      <SpotInfoItem icon={home} label="장소안내">
        {spot.homepage ? (
          <Link href={spot.homepage} target="_blank" rel="noopener noreferrer" className="underline">
            공식 사이트 확인하기
          </Link>
        ) : (
          <p className="underline">공식 사이트 미제공</p>
        )}
      </SpotInfoItem>

      <SpotInfoItem icon={reservation} label="예약">
        {spot.reservation ? (
          <Link href={spot.reservation} target="_blank" rel="noopener noreferrer" className="underline">
            예약 사이트 확인하기
          </Link>
        ) : (
          <p className="underline">예약 사이트 미제공</p>
        )}
      </SpotInfoItem>
    </ul>
  );
}
