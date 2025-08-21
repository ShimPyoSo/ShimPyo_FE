'use client';

import { useEffect, useState } from 'react';

import Confirm from '@/app/(_components)/UI/Confirm';
import { IReviewResponse } from '@/app/(_utils)/type';
import ImageModal from '@/app/(_components)/image/ImageModal';
import ProtectedRoute from '@/app/ProtectedRoute';
import ReviewList from '@/app/(_components)/mypage/review/ReviewList';
import SpotInfo from '@/app/(_components)/mypage/review/SpotInfo';
import axios from 'axios';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useDeleteReview } from '@/app/(_utils)/hooks/useDeleteReview';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function Review() {
  const { id } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number>(0); // 삭제 클릭된 리뷰 아이디
  const [isAllDelete, setIsAllDelete] = useState(false);
  const [reviewImg, setReviewImg] = useState<string[] | null>(null);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const { handleDeleteReview } = useDeleteReview();
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('내가 쓴 후기');
  }, [setTitle]);

  const fetchReviews = async (): Promise<IReviewResponse> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review-detail?touristId=${id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery<IReviewResponse>({
    queryKey: ['spotReviews', id],
    queryFn: fetchReviews,
    refetchOnWindowFocus: false,
  });

  const handleDelete = () => {
    handleDeleteReview(isAllDelete, Number(id), selectedReviewId, refetch);
  };

  return (
    <ProtectedRoute>
      <div className="h-full bg-w1 px-[16px]">
        {data && <SpotInfo info={data} />}
        <div className="mt-[18px] flex justify-end">
          <button
            className="bg-gn1 text-white py-[6px] px-[12px] rounded-md text-sm tracking-[-2%] font-semibold"
            onClick={() => {
              setIsConfirmOpen(true);
              setIsAllDelete(true);
            }}
          >
            전체 삭제하기
          </button>
        </div>

        <ReviewList
          isLoading={isLoading}
          reviews={data?.reviews}
          setIsConfirmOpen={setIsConfirmOpen}
          setSelectedReviewId={setSelectedReviewId}
          setReviewImg={setReviewImg}
          setSelectedNumber={setSelectedNumber}
        />
      </div>
      {isConfirmOpen && (
        <Confirm
          title={'후기 삭제'}
          description={'후기를 삭제하면 복구할 수 없어요.\n정말로 삭제할까요?'}
          confirmText={'삭제하기'}
          cancelText={'취소하기'}
          setIsOpen={setIsConfirmOpen}
          onConfirm={handleDelete}
        />
      )}
      {reviewImg && <ImageModal reviewImg={reviewImg} setReviewImg={setReviewImg} selectedNumber={selectedNumber} />}
    </ProtectedRoute>
  );
}
