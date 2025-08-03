'use client';

import { useEffect } from 'react';

export default function useKakaoAddress(fetchAddress: () => void) {
  const loadKakaoMapScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (typeof window === 'undefined') return;

      if (window.kakao && window.kakao.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_KAKAO_JS_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          resolve();
        } else {
          reject(new Error('카카오 SDK 로딩 실패'));
        }
      };
      script.onerror = reject;

      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    loadKakaoMapScript()
      .then(() => {
        window.kakao.maps.load(() => {
          fetchAddress();
        });
      })
      .catch((err) => {
        console.error('Kakao 지도 로딩 에러:', err);
      });
  }, [fetchAddress]);
}
