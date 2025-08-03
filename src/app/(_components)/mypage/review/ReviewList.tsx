import { IReview } from '@/app/(_utils)/type';
import ReviewItem from '@/app/(_components)/category/review/ReviewItem';

interface ReviewListProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedReviewId: React.Dispatch<React.SetStateAction<number>>;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewList({ setIsOpen, setIsConfirmOpen, setSelectedReviewId }: ReviewListProps) {
  const review: IReview = {
    reviewId: 1,
    createdAt: '2025.08.01',
    contents:
      '텍스트를 입력해 주세요.우선 사진과 똑같이 잘 꾸며져있고 가격 대비 만족도가 너무 좋았어요! 사진과 같이 예쁜 소품들과 빔프로젝터가 있어서 분위기 내기에도 좋았고, 제가 정말 기계치인데 빔프로젝터 연결 방법도 정말 어렵지 않아서 최애 영화 한 편 즐겁게 감상했습니다. 새로 오픈한 숙소...',
    images: [],
  };

  return (
    <ul className="flex flex-col gap-[12px] my-[30px]">
      <ReviewItem
        review={review}
        setIsOpen={setIsOpen}
        type="mypage"
        setSelectedReviewId={setSelectedReviewId}
        setIsConfirmOpen={setIsConfirmOpen}
      />
      <ReviewItem
        review={review}
        setIsOpen={setIsOpen}
        type="mypage"
        setSelectedReviewId={setSelectedReviewId}
        setIsConfirmOpen={setIsConfirmOpen}
      />
    </ul>
  );
}
