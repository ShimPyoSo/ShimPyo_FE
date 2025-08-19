'use client';

import { useEffect, useRef, useState } from 'react';

import { IReview } from '@/app/(_utils)/type';
import ImageList from './ImageList';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/app/(_store)/auth';

interface ReviewItemProps {
  review: IReview;
  type: 'mypage' | 'detail';
  setSelectedReviewId: React.Dispatch<React.SetStateAction<number>>;
  setIsConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewImg: React.Dispatch<React.SetStateAction<string[] | null>>;
  setSelectedNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function ReviewItem({
  review,
  type,
  setSelectedReviewId,
  setIsConfirmOpen,
  setReviewImg,
  setSelectedNumber,
}: ReviewItemProps) {
  const [isMore, setIsMore] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const user = useAtomValue(userAtom);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const maxHeight = lineHeight * 4;

    if (Math.ceil(el.scrollHeight) > Math.ceil(maxHeight)) {
      setIsClamped(true);
    }
  }, []);

  const handleDeleteClick = () => {
    setIsConfirmOpen?.(true);
    setSelectedReviewId(review.reviewId);
  };

  return (
    <li className="p-[12px] bg-[#fbfbfb] border-w4 rounded-xl tracking-[-2%]">
      <div className="flex items-center justify-between mb-[8px]">
        {type === 'detail' && <p className="font-semibold text-sm text-b1">{review.nickname}</p>}
        <div className="flex items-center gap-[6px]">
          <p className="text-xs text-g1">{review.createdAt}</p>
          {review.nickname === user?.nickname && (
            <button className="text-xs text-gn1 underline" onClick={handleDeleteClick}>
              삭제하기
            </button>
          )}
        </div>
      </div>

      <p ref={contentRef} className={`text-xs text-b3 leading-[1.6] ${isMore ? '' : 'line-clamp-4'}`}>
        {review.contents}
      </p>
      {isClamped && (
        <button className="mt-[6px] text-xs text-g1 underline" onClick={() => setIsMore(!isMore)}>
          {isMore ? '접기' : '더보기'}
        </button>
      )}
      {review.images.length > 0 && (
        <ImageList images={review.images} setReviewImg={setReviewImg} setSelectedNumber={setSelectedNumber} />
      )}
    </li>
  );
}
