'use client';

import Confirm from '@/app/(_components)/UI/Confirm';
import ImageInput from '@/app/(_components)/category/review/ImageInput';
import ReviewInput from '@/app/(_components)/category/review/ReviewInput';
import { useState } from 'react';

export default function ReviewWrite() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="min-h-full bg-w1 px-[16px]">
        <ReviewInput />
        <ImageInput />
        <button
          className="mt-[60px] mb-[40px] w-full py-[16px] bg-gn1 border border-gn5 rounded-lg text-white tracking-[-1.3%]"
          onClick={() => setIsOpen(true)}
        >
          등록하기
        </button>
      </div>
      {isOpen && (
        <Confirm
          title={'후기 등록'}
          description={'후기를 등록하면 수정 및 삭제할 수 없어요\n정말로 후기를 등록할까요?'}
          confirmText={'등록하기'}
          cancelText={'돌아가기'}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
