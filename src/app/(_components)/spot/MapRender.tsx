'use client';

import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';

import Marker from '../course/Marker';
import { isMobile } from 'react-device-detect';

interface MapRenderProps {
  latitude: number;
  longitude: number;
}

export default function MapRender({ latitude, longitude }: MapRenderProps) {
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

  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: '186px', marginTop: '12px' }}
      level={3}
      scrollwheel={false}
      draggable={!isMobile}
      onCreate={(map) => {
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      }}
    >
      <CustomOverlayMap position={{ lat: latitude, lng: longitude }} yAnchor={0.5}>
        <Marker day={0} />
      </CustomOverlayMap>
    </Map>
  );
}
