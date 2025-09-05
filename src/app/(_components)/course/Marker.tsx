import Image from 'next/image';
import blue from '/public/images/icons/course/marker/blue.svg';
import blueSelf from '/public/images/icons/course/marker/blueSelf.svg';
import green from '/public/images/icons/course/marker/green.svg';
import greenSelf from '/public/images/icons/course/marker/greenSelf.svg';
import pink from '/public/images/icons/course/marker/pink.svg';
import pinkSelf from '/public/images/icons/course/marker/pinkSelf.svg';
import yellow from '/public/images/icons/course/marker/yellow.svg';
import yellowSelf from '/public/images/icons/course/marker/yellowSelf.svg';

interface MarkerProps {
  day: number;
  id: number;
}

const markers = [blue, pink, yellow, green];
const selfMarkers = [blueSelf, pinkSelf, yellowSelf, greenSelf];

export default function Marker({ day, id }: MarkerProps) {
  const safeDay = Math.min(day, markers.length - 1);

  const src = id === -1 ? selfMarkers[safeDay] : markers[safeDay];

  return <Image src={src} alt="마커" width={63} height={28} />;
}
