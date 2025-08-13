'use client';

import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

import { ILatLng } from '@/app/(_utils)/type';

interface MapRenderProps {
  positions: ILatLng[];
}

export default function MapRender({ positions }: MapRenderProps) {
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
      level={9}
    >
      {path.map((pos, idx) => (
        <MapMarker key={idx} position={pos} />
      ))}

      {path.length > 1 && (
        <Polyline path={path} strokeWeight={4} strokeColor={'#80a281'} strokeOpacity={1} strokeStyle={'solid'} />
      )}
    </Map>
  );
}
