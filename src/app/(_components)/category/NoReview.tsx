import Image from 'next/image';
import noReview from '/public/images/noReview.svg';

export default function NoReview({ main, description }: { main: string; description: string }) {
  return (
    <>
      <Image className="mb-[24px]" src={noReview} alt="결과 없음" width={172} height={95} />
      <p className="text-xs text-g1 tracking-[-2%]">{main}</p>
      <p className="text-sm text-b3 font-semibold tracking-[-1.3%]">{description}</p>
    </>
  );
}
