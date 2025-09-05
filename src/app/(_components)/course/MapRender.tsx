'use client';

import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

import { ILatLng } from '@/app/(_utils)/type';
import Marker from './Marker';

interface MapRenderProps {
  positions: ILatLng[];
  day: number;
}

const DAY_COLORS: Record<number, string> = {
  0: '#67A3C8',
  1: '#EF82AB',
  2: '#E7CF85',
  3: '#AEAB40',
};

export default function MapRender({ positions, day }: MapRenderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_KAKAO_JS_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => setIsReady(true));
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (!isReady) return null;

  const path = positions.map((pos) => ({
    lat: pos.latitude ?? 37.5665,
    lng: pos.longitude ?? 126.978,
  }));

  return (
    <Map
      center={path[0] ?? { lat: 37.5665, lng: 126.978 }}
      style={{ width: '100%', height: '206px', borderRadius: '5px', marginTop: '12px' }}
      level={path.length === 1 ? 4 : 9}
      onCreate={(map) => {
        if (path.length > 1) {
          const bounds = new window.kakao.maps.LatLngBounds();

          path.forEach((pos) => {
            const latlng = new window.kakao.maps.LatLng(pos.lat, pos.lng) as unknown as kakao.maps.LatLng;
            bounds.extend(latlng);
          });

          map.setBounds(bounds);
        }
      }}
    >
      {path.map((pos, idx) => (
        <CustomOverlayMap key={idx} position={pos} yAnchor={1}>
          <Marker day={day} />
        </CustomOverlayMap>
      ))}

      {path.length > 1 && (
        <Polyline path={path} strokeWeight={4} strokeColor={DAY_COLORS[day]} strokeOpacity={1} strokeStyle={'solid'} />
      )}
    </Map>
  );
}
