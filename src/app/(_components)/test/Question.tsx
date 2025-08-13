'use client';

import Answer from './Answer';
import Loader from '../UI/Loader';
import Progress from './Progress';
import useQuestion from '@/app/(_utils)/hooks/useTestQuestion';

export default function Question() {
  const { currentIndex, selected, setSelected, handleNext } = useQuestion();

  return (
    <div className="grow-1 relative">
      {currentIndex < 10 ? (
        <>
          <Progress num={currentIndex} />
          <Answer currentIndex={currentIndex} selected={selected} setSelected={setSelected} />
          <button
            disabled={selected === -1}
            className="fixed bottom-[16px] w-[342px] py-[16px] border rounded-lg font-semibold tracking-[-1.3%] bg-gn1 text-white border-gn5 outline-none"
            onClick={handleNext}
          >
            {currentIndex < 9 ? '다음으로' : '나의 쉼표 유형 확인하기'}
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
