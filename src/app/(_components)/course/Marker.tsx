import Image from 'next/image';
import blue from '/public/images/icons/course/marker/blue.svg';
import green from '/public/images/icons/course/marker/green.svg';
import pink from '/public/images/icons/course/marker/pink.svg';
import yellow from '/public/images/icons/course/marker/yellow.svg';

interface MarkerProps {
  day: number;
}

export default function Marker({ day }: MarkerProps) {
  return (
    <Image src={day === 0 ? blue : day === 1 ? pink : day === 2 ? yellow : green} alt="마커" width={63} height={28} />
  );
}
