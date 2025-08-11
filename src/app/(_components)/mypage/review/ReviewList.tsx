import { IReview } from '@/app/(_utils)/type';
import NoReview from '../../category/NoReview';
import ReviewItem from '@/app/(_components)/category/review/ReviewItem';
import ReviewSkeleton from '../../category/review/ReviewSkeleton';

interface ReviewListProps {
  isLoading: boolean;
  reviews: IReview[] | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedReviewId: React.Dispatch<React.SetStateAction<number>>;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewList({
  isLoading,
  reviews,
  setIsOpen,
  setIsConfirmOpen,
  setSelectedReviewId,
}: ReviewListProps) {
  return (
    <ul className="h-[calc(100%-100px)] flex flex-col gap-[12px] my-[16px]">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
      ) : reviews && reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <ReviewItem
            review={review}
            setIsOpen={setIsOpen}
            type="mypage"
            setSelectedReviewId={setSelectedReviewId}
            setIsConfirmOpen={setIsConfirmOpen}
            key={idx}
          />
        ))
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <NoReview main="첫 번째 여행 이야기를 남겨주세요!" description="아직 작성하신 후기가 없어요" />
        </div>
      )}
    </ul>
  );
}
