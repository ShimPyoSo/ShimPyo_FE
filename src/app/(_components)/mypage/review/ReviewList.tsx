import { IReview } from '@/app/(_utils)/type';
import NoReview from '../../category/NoReview';
import ReviewItem from '@/app/(_components)/category/review/ReviewItem';
import ReviewSkeleton from '../../category/review/ReviewSkeleton';

interface ReviewListProps {
  isLoading: boolean;
  reviews: IReview[] | undefined;
  setSelectedReviewId: React.Dispatch<React.SetStateAction<number>>;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewImg: React.Dispatch<React.SetStateAction<string[] | null>>;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReviewList({
  isLoading,
  reviews,
  setIsConfirmOpen,
  setSelectedReviewId,
  setReviewImg,
  setSelectedNumber,
}: ReviewListProps) {
  return (
    <ul className="h-[calc(100%-100px)] flex flex-col gap-[12px] my-[16px]">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
      ) : reviews && reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <ReviewItem
            review={review}
            type="mypage"
            setSelectedReviewId={setSelectedReviewId}
            setIsConfirmOpen={setIsConfirmOpen}
            setReviewImg={setReviewImg}
            setSelectedNumber={setSelectedNumber}
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
