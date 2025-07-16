'use client';

import { ILocation } from '@/app/(_utils)/type';
import Image from 'next/image';
import Script from 'next/script';
import WellnessFactor from './WellnessFactor';
import { getCurrentLocation } from '@/app/(_utils)/hooks/useCurrentLocation';
import gps from '/public/images/icons/gps.svg';
import { useState } from 'react';
import wellness from '/public/images/icons/wellness/wellness.svg';

export default function TodayWellness() {
  const [location, setLocation] = useState<ILocation | null>(null);

  const fetchAddress = async () => {
    try {
      const addr = await getCurrentLocation();
      setLocation(addr);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="mt-[70px] pr-[16px]">
      <h3 className="font-[kkubulim] text-gn1 text-xl">오늘 웰니스 지수</h3>
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

      <div className="mt-[40px]">
        <Image src={wellness} alt="wellness" width={344} height={150} />
      </div>
      <WellnessFactor location={location} />
    </section>
  );
}
