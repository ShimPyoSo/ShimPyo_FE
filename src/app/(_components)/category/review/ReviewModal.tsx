import axios, { AxiosError } from 'axios';

import Alert from '@/app/(_components)/UI/Alert';
import Confirm from '@/app/(_components)/UI/Confirm';
import { IError } from '@/app/(_utils)/type';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ReviewModalProps {
  isConfirmOpen: boolean;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isImageError: boolean;
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>;
  isImageCountError: boolean;
  setIsImageCountError: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  contents: string;
}

export default function ReviewModal({
  isImageError,
  isAlertOpen,
  isConfirmOpen,
  isImageCountError,
  setIsImageError,
  setIsImageCountError,
  setIsAlertOpen,
  setIsConfirmOpen,
  images,
  contents,
}: ReviewModalProps) {
  const [isContentLength, setIsContentLength] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { handleAccessExpired } = useHandleTokenExpired();

  const handleUplodaReview = async () => {
    if (contents.length < 5) {
      setIsContentLength(true);
      return;
    }

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/reviews`,
        {
          id,
          images: images.length === 0 ? null : images,
          contents,
        },
        { withCredentials: true }
      );
      setIsAlertOpen(true);
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/tourlist/reviews`,
            {
              id,
              images: images.length === 0 ? null : images,
              contents,
            },
            { withCredentials: true }
          );
          setIsAlertOpen(true);
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <>
      {isConfirmOpen && (
        <Confirm
          title={'후기 등록'}
          description={'후기를 등록하면 수정할 수 없어요\n정말로 후기를 등록할까요?'}
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
          onConfirm={() => router.push(`/category/${id}/review`)}
        />
      )}
      {isImageError && (
        <Alert
          title={'이미지 업로드 실패'}
          description={'이미지는 10MB 이하의 png, jpg/jpeg 파일만 업로드 가능합니다.'}
          confirmText={'확인'}
          setIsOpen={setIsAlertOpen}
          onConfirm={() => setIsImageError(false)}
        />
      )}
      {isImageCountError && (
        <Alert
          title={'이미지 업로드 실패'}
          description={'이미지는 최대 8개의 이미지만 업로드 가능합니다.'}
          confirmText={'확인'}
          setIsOpen={setIsAlertOpen}
          onConfirm={() => setIsImageCountError(false)}
        />
      )}
      {isContentLength && (
        <Alert
          title={'후기 등록 실패'}
          description={'후기는 최소 5자 이상, 최대 500자 미만으로 작성 가능합니다.'}
          confirmText={'확인'}
          setIsOpen={setIsAlertOpen}
          onConfirm={() => setIsContentLength(false)}
        />
      )}
    </>
  );
}
