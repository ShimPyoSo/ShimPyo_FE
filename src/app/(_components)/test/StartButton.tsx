'use client';

import { resetAllAtom, setCurrentIndexAtom } from '@/app/(_store)/test';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();
  const [, setCurrentIndex] = useAtom(setCurrentIndexAtom);
  const [, resetAll] = useAtom(resetAllAtom);

  const handleStart = () => {
    setCurrentIndex(0);
    resetAll();
    router.push('/test/question');
  };

  return (
    <div className="mt-[80px] flex items-center gap-[12px]">
      <button
        onClick={handleStart}
        className="grow bg-gn1 border border-gn5 text-white rounded-md py-[14px] tracking-[-1.3%] font-semibold text-center"
      >
        시작하기
      </button>
      <Link
        className="grow-1 bg-w3 border border-w4 text-b3 rounded-md py-[14px] tracking-[-1.3%] font-semibold text-center"
        href={'/test/question'}
      >
        이어하기
      </Link>
    </div>
  );
}
