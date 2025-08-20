'use client';

import Loader from '@/app/(_components)/UI/Loader';
import ProtectedRoute from '@/app/ProtectedRoute';
import ReviewForm from '@/app/(_components)/category/review/ReviewForm';
import ReviewModal from '@/app/(_components)/category/review/ReviewModal';
import { useState } from 'react';

export default function ReviewWrite() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isImageCountError, setIsImageCountError] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [contents, setContents] = useState<string>('');

  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <ReviewForm
          setIsOpen={setIsConfirmOpen}
          images={images}
          setImages={setImages}
          contents={contents}
          setContents={setContents}
          setIsImageError={setIsImageError}
          setIsImageCountError={setIsImageCountError}
          setIsLoading={setIsLoading}
        />
      </div>
      <ReviewModal
        isAlertOpen={isAlertOpen}
        isConfirmOpen={isConfirmOpen}
        isImageCountError={isImageCountError}
        isImageError={isImageError}
        setIsAlertOpen={setIsAlertOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        setIsImageCountError={setIsImageCountError}
        setIsImageError={setIsImageError}
        images={images}
        contents={contents}
      />
      {isLoading && <Loader />}
    </ProtectedRoute>
  );
}
