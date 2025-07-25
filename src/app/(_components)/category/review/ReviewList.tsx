import Image from 'next/image';
import ReviewItem from './ReviewItem';
import noReview from '/public/images/noReview.svg';

interface ReviewListProps {
  hasReview: boolean;
  setHasReview: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewList({ hasReview, setHasReview, setIsOpen }: ReviewListProps) {
  return (
    <>
      {hasReview ? (
        <ul className="flex flex-col gap-[12px] mt-[50px] pb-[40px]">
          <ReviewItem setIsOpen={setIsOpen} />
          <ReviewItem setIsOpen={setIsOpen} />
          <ReviewItem setIsOpen={setIsOpen} />
          <ReviewItem setIsOpen={setIsOpen} />
          <ReviewItem setIsOpen={setIsOpen} />
          <ReviewItem setIsOpen={setIsOpen} />
        </ul>
      ) : (
        <div
          className="flex flex-col justify-center items-center h-[calc(100vh-120px)]"
          onClick={() => setHasReview(true)}
        >
          <Image className="mb-[24px]" src={noReview} alt="리뷰 없음" width={172} height={95} />
          <p className="text-xs text-g1 tracking-[-2%]">가장 먼저 후기를 남겨보세요!</p>
          <p className="text-sm text-b3 font-semibold tracking-[-1.3%]">아직 방문객 후기가 없어요</p>
        </div>
      )}
    </>
  );
}
