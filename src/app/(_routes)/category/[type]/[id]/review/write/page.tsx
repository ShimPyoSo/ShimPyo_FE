'use client';

import Alert from '@/app/(_components)/UI/Alert';
import Confirm from '@/app/(_components)/UI/Confirm';
import ReviewForm from '@/app/(_components)/category/review/ReviewForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ReviewWrite() {
  const { type, id } = useParams();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [contents, setContents] = useState<string>('');
  const router = useRouter();

  const handleUplodaReview = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/reviews`,
        {
          id,
          images,
          contents,
        },
        { withCredentials: true }
      );
      setIsAlertOpen(true);
    } catch (error) {
      console.log(error); // 리뷰 등록 실패 시 오류 추후 구현
    }
  };

  return (
    <>
      <div className="min-h-full bg-w1 px-[16px]">
        <ReviewForm
          setIsOpen={setIsConfirmOpen}
          images={images}
          setImages={setImages}
          contents={contents}
          setContents={setContents}
        />
      </div>
      {isConfirmOpen && (
        <Confirm
          title={'후기 등록'}
          description={'후기를 등록하면 수정 및 삭제할 수 없어요\n정말로 후기를 등록할까요?'}
          confirmText={'등록하기'}
          cancelText={'돌아가기'}
          setIsOpen={setIsConfirmOpen}
          onConfirm={handleUplodaReview}
        />
      )}
      {isAlertOpen && (
        <Alert
          title={'후기 등록'}
          description={'후기가 정상적으로 등록되었습니다.'}
          confirmText={'확인'}
          setIsOpen={setIsAlertOpen}
          onConfirm={() => router.push(`/category/${type}/${id}/review`)}
        />
      )}
    </>
  );
}
