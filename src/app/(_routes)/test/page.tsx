'use client';

import Image from 'next/image';
import Question from '@/app/(_components)/test/Question';
import illu from '/public/images/icons/illustration/test.svg';
import { useState } from 'react';

export default function Test() {
  const [isTesting, setIsTesting] = useState(false);

  return (
    <div className="min-h-full bg-w1 px-[16px] pb-[70px] flex flex-col justify-center">
      {isTesting ? (
        <Question />
      ) : (
        <>
          <h2 className="text-center">
            <small className="tracking-[-2%] text-g1 text-sm">나는 어떤 휴식이 필요할까?</small>
            <p className="mt-[5px] font-[kkubulim] text-3xl text-gn1">&ldquo; 쉼표 유형 테스트 &rdquo;</p>
          </h2>
          <Image className="mx-auto mt-[40px]" src={illu} alt="쉼표 유형 테스트" width={220} height={240} />
          <div className="mt-[80px] flex items-center gap-[12px]">
            <button
              className="grow-1 bg-gn1 border border-gn5 text-white rounded-md py-[16px] tracking-[-1.3%] font-semibold"
              onClick={() => setIsTesting(true)}
            >
              시작하기
            </button>
            <button
              className="grow-1 bg-w3 border border-w4 text-b3 rounded-md py-[16px] tracking-[-1.3%] font-semibold"
              onClick={() => setIsTesting(true)}
            >
              이어하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
