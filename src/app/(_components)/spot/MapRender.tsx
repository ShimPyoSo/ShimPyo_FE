'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface MapRenderProps {
  latitude: number;
  longitude: number;
}

export default function MapRender({ latitude, longitude }: MapRenderProps) {
  return (
    <Map
      center={{ lat: latitude, lng: longitude }}
      style={{ width: '100%', height: '186px', marginTop: '12px' }}
      level={3}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
    </Map>
  );
}
