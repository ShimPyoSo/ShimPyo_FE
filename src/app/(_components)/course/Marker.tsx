/* eslint-disable @next/next/no-img-element */

interface MarkerProps {
  day: number;
}

const selfMarkers = [
  '/images/icons/course/marker/blueSelf.svg',
  '/images/icons/course/marker/pinkSelf.svg',
  '/images/icons/course/marker/yellowSelf.svg',
  '/images/icons/course/marker/greenSelf.svg',
];

export default function Marker({ day }: MarkerProps) {
  const safeDay = Math.min(day, selfMarkers.length - 1);

  return (
    <div
      style={{
        width: '30px',
        height: '45px',
      }}
    >
      <img src={selfMarkers[safeDay]} alt="마커" width={30} height={45} />
    </div>
  );
}
