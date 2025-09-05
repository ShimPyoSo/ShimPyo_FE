'use client';

import Answer from './Answer';
import Loader from '../UI/Loader';
import Progress from './Progress';
import useQuestion from '@/app/(_utils)/hooks/useTestQuestion';
import { useRef } from 'react';

export default function Question() {
  const topRef = useRef<HTMLDivElement>(null);
  const { currentIndex, selected, setSelected, handleNext, handlePrev } = useQuestion();

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  return (
    <div className="grow-1 relative">
      <div ref={topRef} />
      {currentIndex < 10 ? (
        <>
          <Progress num={currentIndex} />
          <Answer currentIndex={currentIndex} selected={selected} setSelected={setSelected} />
          <div className="w-[343px] fixed bottom-[16px] flex items-center gap-[12px] tracking-[-0.013em]">
            <button
              className="grow py-[16px] border rounded-lg font-semibold bg-[#FBFBFB] text-b1 border-w4 outline-none"
              onClick={() => {
                handlePrev();
                scrollToTop();
              }}
            >
              이전으로
            </button>
            <button
              disabled={selected === -1}
              className="grow py-[16px] border rounded-lg font-semibold bg-gn1 text-white border-gn5 outline-none"
              onClick={() => {
                handleNext();
                scrollToTop();
              }}
            >
              {currentIndex < 9 ? '다음으로' : '쉼표 유형 확인하기'}
            </button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
