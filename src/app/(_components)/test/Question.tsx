'use client';

import Answer from './Answer';
import Loader from '../UI/Loader';
import Progress from './Progress';
import useQuestion from '@/app/(_utils)/hooks/useTestQuestion';

export default function Question() {
  const { currentIndex, selected, setSelected, handleNext, handlePrev } = useQuestion();

  return (
    <div className="grow-1 relative">
      {currentIndex < 10 ? (
        <>
          <Progress num={currentIndex} />
          <Answer currentIndex={currentIndex} selected={selected} setSelected={setSelected} />
          <div className="w-[343px] fixed bottom-[16px] flex items-center gap-[12px] tracking-[-1.3%]">
            <button
              className="grow py-[16px] border rounded-lg font-semibold bg-[#FBFBFB] text-b1 border-w4 outline-none"
              onClick={handlePrev}
            >
              이전으로
            </button>
            <button
              disabled={selected === -1}
              className="grow py-[16px] border rounded-lg font-semibold bg-gn1 text-white border-gn5 outline-none"
              onClick={handleNext}
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
