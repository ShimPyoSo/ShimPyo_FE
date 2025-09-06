'use client';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import Confirm from '@/app/(_components)/UI/Confirm';
import { IError } from '@/app/(_utils)/type';
import ImageModal from '@/app/(_components)/image/ImageModal';
import Link from 'next/link';
import ReviewList from '@/app/(_components)/category/review/ReviewList';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';

export default function Review() {
  const { id } = useParams();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number>(0); // 삭제 클릭된 리뷰 아이디
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [reviewImg, setReviewImg] = useState<string[] | null>(null);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const { handleAccessExpired } = useHandleTokenExpired();
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('후기');
  }, [setTitle]);

  const handleDeleteReview = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review?touristId=${id}&reviewId=${selectedReviewId}`,
        { withCredentials: true }
      );
      setShouldRefetch(true);
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/review?touristId=${id}&reviewId=${selectedReviewId}`,
            { withCredentials: true }
          );
          setShouldRefetch(true);
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <>
      <div className="min-h-full bg-w1 px-[16px]">
        <div className="mt-[30px] flex items-start justify-between tracking-[-0.02em]">
          <div>
            <p className="font-[kkubulim] text-lg text-gn1">방문객 후기</p>
            <small className="text-sm text-g1">다양한 방문 후기를 읽고 작성해 보세요</small>
          </div>
          <Link
            className="text-sm text-w3 bg-gn1 border border-gn5 rounded-md py-[6px] px-[12px]"
            href={`/category/${id}/review/write`}
            role="button"
          >
            작성하기
          </Link>
        </div>

        <ReviewList
          setReviewImg={setReviewImg}
          setSelectedNumber={setSelectedNumber}
          setIsOpen={setIsDeleteOpen}
          setSelectedReviewId={setSelectedReviewId}
          shouldRefetch={shouldRefetch}
          setShouldRefetch={setShouldRefetch}
        />
      </div>
      {reviewImg && <ImageModal reviewImg={reviewImg} setReviewImg={setReviewImg} selectedNumber={selectedNumber} />}
      {isDeleteOpen && (
        <Confirm
          title={'후기 삭제'}
          description={'후기를 삭제하면 복구할 수 없어요.\n정말로 삭제할까요?'}
          confirmText={'삭제하기'}
          cancelText={'취소하기'}
          setIsOpen={setIsDeleteOpen}
          onConfirm={handleDeleteReview}
        />
      )}
    </>
  );
}
