import Image from 'next/image';
import bad from '/public/images/icons/wellness/dustBad.svg';
import good from '/public/images/icons/wellness/dustGood.svg';
import mid from '/public/images/icons/wellness/dustMid.svg';

interface FineDustProps {
  dust: number | null;
}

export default function FineDust({ dust }: FineDustProps) {
  return (
    <li className="flex flex-col items-center text-xs">
      <div className="w-[48px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] flex justify-center items-center">
        <Image src={dust === 1 ? good : dust === 2 ? mid : bad} alt="미세먼지" width={24} height={24} />
      </div>
      <p className="mt-[12px] text-g1 tracking-[-2%]">미세먼지</p>
      <p className="mt-[4px] text-b3 font-semibold tracking-[-2%]">
        {dust === null ? '정보 없음' : dust === 1 ? '좋음' : dust === 2 ? '보통' : dust === 3 ? '나쁨' : '매우나쁨'}
      </p>
    </li>
  );
}
