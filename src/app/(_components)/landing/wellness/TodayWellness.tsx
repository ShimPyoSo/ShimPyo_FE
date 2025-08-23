'use client';

import { useCallback, useState } from 'react';

import { ILocation } from '@/app/(_utils)/type';
import Image from 'next/image';
import Link from 'next/link';
import WellnessFactor from './WellnessFactor';
import { getAddressFromCoords } from '@/app/(_utils)/hooks/useGetLocation';
import gps from '/public/images/icons/gps.svg';
import useKakaoAddress from '@/app/(_utils)/hooks/useKakaoAddress';

export default function TodayWellness() {
  const [location, setLocation] = useState<ILocation>({
    region_1depth_name: '서울특별시',
    region_2depth_name: '중구',
    region_3depth_name: '태평로1가',
  });

  const fetchAddress = useCallback(async () => {
    try {
      await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('브라우저가 위치 정보를 지원하지 않습니다.'));
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
        });
      })
        .then(async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoords(latitude, longitude);
          setLocation(address);
        })
        .catch(async () => {
          const fallbackAddress = await getAddressFromCoords(37.5665, 126.978); // 위치 정보 불러오기 실패 시 default 값
          setLocation(fallbackAddress);
        });
    } catch (error) {
      alert('주소를 가져오는 데 실패했습니다: ' + error);
    }
  }, []);

  useKakaoAddress(fetchAddress);

  return (
    <section className="my-[70px] pr-[16px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">오늘 웰니스 지수</h3>
      <div className="mt-[2px] flex items-center gap-[4px]">
        <Image src={gps} alt="위치" width={16} height={16} />
        <p className="text-sm text-g1">
          {location?.region_1depth_name} {location?.region_2depth_name} {location?.region_3depth_name}
        </p>
      </div>
      <WellnessFactor location={location} />
      <span className="mt-[8px] flex items-center text-xs text-g1 tracking-[-2%]">
        ⓘ&nbsp;
        <Link
          className="text-b3"
          href={'https://www.weather.go.kr/w/index.do'}
          rel="noopener noreferrer"
          target="_blank"
        >
          기상청
        </Link>
        ,&nbsp;
        <Link className="text-b3" href={'https://www.keco.or.kr'} rel="noopener noreferrer" target="_blank">
          한국환경공단
        </Link>
        에서 제공하는 정보예요.
      </span>
    </section>
  );
}
