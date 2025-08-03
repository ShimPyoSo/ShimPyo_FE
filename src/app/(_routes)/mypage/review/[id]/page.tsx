'use client';

import Confirm from '@/app/(_components)/UI/Confirm';
import ImageModal from '@/app/(_components)/image/ImageModal';
import ReviewList from '@/app/(_components)/mypage/review/ReviewList';
import SpotInfo from '@/app/(_components)/mypage/review/SpotInfo';
import { useState } from 'react';

export default function Review() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number>(0); // 삭제 클릭된 리뷰 아이디

  const handleDeleteReview = () => {
    // 삭제 API 추가되면 수정 예정
    console.log(selectedReviewId);
  };

  return (
    <>
      <div className="min-h-full bg-w1 px-[16px]">
        <SpotInfo />
        <ReviewList
          setIsConfirmOpen={setIsConfirmOpen}
          setIsOpen={setIsOpen}
          setSelectedReviewId={setSelectedReviewId}
        />
      </div>
      {isConfirmOpen && (
        <Confirm
          title={'후기 삭제'}
          description={'후기를 삭제하면 복구할 수 없어요.\n정말로 삭제할까요?'}
          confirmText={'삭제하기'}
          cancelText={'취소하기'}
          setIsOpen={setIsConfirmOpen}
          onConfirm={handleDeleteReview}
        />
      )}
      {isOpen && <ImageModal setIsOpen={setIsOpen} />}
    </>
  );
}
