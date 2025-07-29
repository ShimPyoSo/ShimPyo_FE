import Image from 'next/image';
import noReview from '/public/images/noReview.svg';

export default function NoReview() {
  return (
    <>
      <Image className="mb-[24px]" src={noReview} alt="리뷰 없음" width={172} height={95} />
      <p className="text-xs text-g1 tracking-[-2%]">가장 먼저 후기를 남겨보세요!</p>
      <p className="text-sm text-b3 font-semibold tracking-[-1.3%]">아직 방문객 후기가 없어요</p>
    </>
  );
}
