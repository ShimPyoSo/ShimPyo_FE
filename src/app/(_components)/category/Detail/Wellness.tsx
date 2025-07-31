'use client';

import { ILocation } from '@/app/(_utils)/type';
import Image from 'next/image';
import Script from 'next/script';
import WeeklyWellness from './WeeklyWellnes';
import { getAddressFromCoords } from '@/app/(_utils)/hooks/useGetLocation';
import gps from '/public/images/icons/gps.svg';
import { useState } from 'react';

export default function Wellness() {
  const [location, setLocation] = useState<ILocation | null>(null);

  const fetchAddress = async () => {
    try {
      const address = await getAddressFromCoords(37.5665, 126.978); // 위치 정보 불러오기 (임의 값 적용 중)
      setLocation(address);
    } catch (error) {
      alert('주소를 가져오는 데 실패했습니다: ' + error);
    }
  };

  return (
    <section className="mt-[60px] px-[16px]">
      <p className="font-[kkubulim] text-lg text-gn1 tracking-[-2%]">이번주 웰니스 지수</p>
      <div className="mt-[2px] flex items-center gap-[4px]">
        <Image src={gps} alt="위치" width={16} height={16} />
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_KAKAO_JS_KEY}&autoload=false&libraries=services`}
          strategy="afterInteractive"
          onLoad={() => {
            window.kakao.maps.load(() => {
              fetchAddress();
            });
          }}
        />
        <p className="text-sm text-g1">
          {location?.region_1depth_name} {location?.region_2depth_name} {location?.region_3depth_name}
        </p>
      </div>
      <WeeklyWellness />
    </section>
  );
}
