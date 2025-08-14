import Image, { StaticImageData } from 'next/image';

import { IFacilities } from '@/app/(_utils)/type';
import accessible from '/public/images/icons/spot/service/accessible.svg';
import accessibleActive from '/public/images/icons/spot/service/accessibleActive.svg';
import child from '/public/images/icons/spot/service/child.svg';
import childActive from '/public/images/icons/spot/service/childActive.svg';
import parking from '/public/images/icons/spot/service/parking.svg';
import parkingActive from '/public/images/icons/spot/service/parkingActive.svg';
import pet from '/public/images/icons/spot/service/pet.svg';
import petActive from '/public/images/icons/spot/service/petActive.svg';
import tourDesk from '/public/images/icons/spot/service/tourDesk.svg';
import tourDeskActive from '/public/images/icons/spot/service/tourDeskActive.svg';
import wifi from '/public/images/icons/spot/service/wifi.svg';
import wifiActive from '/public/images/icons/spot/service/wifiActive.svg';

export default function Facilities({ services }: { services: IFacilities | undefined }) {
  const serviceMap: Record<string, { default: StaticImageData; active: StaticImageData; label: string }> = {
    accessible: { default: accessible, active: accessibleActive, label: '장애인 편의' },
    child: { default: child, active: childActive, label: '유아 동반' },
    parking: { default: parking, active: parkingActive, label: '주차 가능' },
    pet: { default: pet, active: petActive, label: '반려동물 동반' },
    tourDesk: { default: tourDesk, active: tourDeskActive, label: '관광/안내 데스크' },
    wifi: { default: wifi, active: wifiActive, label: '무료 Wi-Fi' },
  };

  return (
    <ul className="flex items-center gap-[4px]">
      {Object.entries(serviceMap).map(([key, { default: icon, active, label }]) => {
        const isActive = services ? services[key as keyof IFacilities] : false;
        return (
          <li key={key} title={label}>
            <Image src={isActive ? active : icon} alt={label} width={24} height={24} />
          </li>
        );
      })}
    </ul>
  );
}
