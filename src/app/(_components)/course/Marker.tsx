import Image from 'next/image';
import blueSelf from '/public/images/icons/course/marker/blueSelf.svg';
import greenSelf from '/public/images/icons/course/marker/greenSelf.svg';
import pinkSelf from '/public/images/icons/course/marker/pinkSelf.svg';
import yellowSelf from '/public/images/icons/course/marker/yellowSelf.svg';

interface MarkerProps {
  day: number;
}

const selfMarkers = [blueSelf, pinkSelf, yellowSelf, greenSelf];

export default function Marker({ day }: MarkerProps) {
  const safeDay = Math.min(day, selfMarkers.length - 1);

  return <Image src={selfMarkers[safeDay]} alt="마커" width={24} height={36} />;
}
