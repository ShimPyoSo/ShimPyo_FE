'use client';

import Script from 'next/script';
import { useState } from 'react';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => {
          getLat: () => number;
          getLng: () => number;
        };
        services: {
          Geocoder: new () => {
            coord2Address: (
              lng: number,
              lat: number,
              callback: (result: KakaoAddressResult, status: string) => void
            ) => void;
          };
          Status: {
            OK: string;
          };
        };
      };
    };
  }
}

type KakaoAddressResult = {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
}[];

export default function CurrentLocation() {
  const [address, setAddress] = useState<string | null>(null);

  const getCurrentAddress = () => {
    if (!navigator.geolocation) {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const geocoder = new window.kakao.maps.services.Geocoder();
        const coord = new window.kakao.maps.LatLng(latitude, longitude);

        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: KakaoAddressResult, status: string) => {
          if (status === window.kakao.maps.services.Status.OK) {
            if (result[0]) {
              setAddress(
                `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`
              );
            } else {
              alert('주소 정보를 찾을 수 없습니다.');
            }
          } else {
            alert('주소 변환에 실패했습니다.');
          }
        });
      },
      (err) => {
        alert('위치 정보를 가져오는 데 실패했습니다: ' + err.message);
      }
    );
  };

  return (
    <>
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_KAKAO_JS_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onLoad={() => {
          window.kakao.maps.load(() => {
            getCurrentAddress();
          });
        }}
      />

      <p className="text-sm text-g1">{address}</p>
    </>
  );
}
