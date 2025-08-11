import { IReview } from '@/app/(_utils)/type';
import NoReview from '../../category/NoReview';
import ReviewItem from '@/app/(_components)/category/review/ReviewItem';
import ReviewSkeleton from '../../category/review/ReviewSkeleton';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface ReviewListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedReviewId: React.Dispatch<React.SetStateAction<number>>;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewList({ setIsOpen, setIsConfirmOpen, setSelectedReviewId }: ReviewListProps) {
  const { id } = useParams();
  const fetchReviews = async (): Promise<IReview[]> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review-detail?touristId=${id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  const { data: reviews = [], isLoading } = useQuery<IReview[]>({
    queryKey: ['spotReviews', id],
    queryFn: fetchReviews,
    refetchOnWindowFocus: false,
  });

  return (
    <ul className="h-[calc(100%-100px)] flex flex-col gap-[12px] my-[16px]">
      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => <ReviewSkeleton key={i} />)
      ) : reviews.length > 0 ? (
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
