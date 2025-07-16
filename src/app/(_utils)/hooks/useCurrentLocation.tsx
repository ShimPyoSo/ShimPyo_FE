import { ILocation } from '../type';

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

export const getCurrentLocation = async (): Promise<ILocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('브라우저가 위치 정보를 지원하지 않습니다.');
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
              const { address } = result[0];
              resolve({
                region_1depth_name: address.region_1depth_name,
                region_2depth_name: address.region_2depth_name,
                region_3depth_name: address.region_3depth_name,
              });
            } else {
              reject('주소 정보를 찾을 수 없습니다.');
            }
          } else {
            reject('주소 변환에 실패했습니다.');
          }
        });
      },
      (err) => {
        reject('위치 정보를 가져오는 데 실패했습니다: ' + err.message);
      }
    );
  });
};
