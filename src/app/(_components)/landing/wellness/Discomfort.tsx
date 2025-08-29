import { useEffect, useState } from 'react';

import Image from 'next/image';
import bad from '/public/images/icons/wellness/dustBad.svg';
import good from '/public/images/icons/wellness/dustGood.svg';
import mid from '/public/images/icons/wellness/dustMid.svg';
import terrible from '/public/images/icons/wellness/dustTerrible.svg';

interface DiscomfortProps {
  temperature: number | null;
  humidity: number | null;
}

export default function Discomfort({ temperature, humidity }: DiscomfortProps) {
  const [index, setIndex] = useState(68);

  useEffect(() => {
    if (temperature === null || humidity === null) return;
    const T = temperature;
    const RH = humidity / 100;
    const DI = 1.8 * T - 0.55 * (1 - RH) * (1.8 * T - 26) + 32;
    setIndex(Math.round(DI));
  }, [temperature, humidity]);

  return (
    <li className="flex flex-col items-center text-xs">
      <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
        <Image
          src={index < 68 ? good : index < 75 ? mid : index < 80 ? bad : terrible}
          alt="불쾌지수"
          width={24}
          height={24}
        />
      </div>
      <p className="mt-[12px] text-g1 tracking-[-0.02em]">불쾌지수</p>
      <p className="mt-[4px] text-b3 font-semibold tracking-[-0.02em]">
        {index < 68 ? '좋음' : index < 75 ? '보통' : index < 80 ? '나쁨' : '매우나쁨'}
      </p>
    </li>
  );
}
