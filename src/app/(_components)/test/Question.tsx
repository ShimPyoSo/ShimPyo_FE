'use client';

import { useEffect, useRef, useState } from 'react';

import Answer from './Answer';
import Progress from './Progress';
import { optionals } from '@/app/(_utils)/constants';

export default function Question() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<{ [key: number]: number }>({});
  const [optional, setOptional] = useState<string[]>([]); // 해당 부분 전역으로 변경해야 할 수 있음. 추후 수정 예정
  const [selected, setSelected] = useState(-1);

  const answeredRef = useRef(answered);
  const optionalRef = useRef(optional);

  const handleNext = () => {
    if (selected === -1) return;
    if (currentIndex < 7) {
      setAnswered((prev) => ({
        ...prev,
        [currentIndex + 1]: selected + 1,
      }));
    } else {
      setOptional((prev) => [...prev, optionals[currentIndex - 7].answers[selected]]);
    }

    setSelected(-1);
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    answeredRef.current = answered;
  }, [answered]);

  useEffect(() => {
    optionalRef.current = optional;
  }, [optional]);

  useEffect(() => {
    if (currentIndex === 10) {
      console.log(answeredRef.current);
      console.log(optionalRef.current);
      // axios 호출 이후 결과 페이지 이동 추후 구현
    }
  }, [currentIndex]);

  return (
    <div className="grow-1 relative">
      {currentIndex < 10 && (
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
      )}
    </div>
  );
}
