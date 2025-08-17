import Image from 'next/image';
import blue from '/public/images/icons/course/marker/blue.svg';
import green from '/public/images/icons/course/marker/green.svg';
import pink from '/public/images/icons/course/marker/pink.svg';
import yellow from '/public/images/icons/course/marker/yellow.svg';

interface MarkerProps {
  name: string;
  day: number;
}

export default function Marker({ name, day }: MarkerProps) {
  return (
    <div className="relative w-[63px] h-[28px]">
      <Image src={day === 0 ? blue : day === 1 ? pink : day === 2 ? yellow : green} alt="마커" width={63} height={28} />
      <p className="w-[60px] absolute top-[2.5px] left-[4.5px] text-xs font-semibold text-b1 tracking-[-0.02em] truncate">
        {name}
      </p>
    </div>
  );
}
