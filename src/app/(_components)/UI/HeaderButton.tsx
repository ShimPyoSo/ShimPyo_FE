'use client';

import { resetAllAtom, setCurrentIndexAtom } from '@/app/(_store)/test';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import { useAtom } from 'jotai';

export default function HeaderButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [, resetAll] = useAtom(resetAllAtom);
  const [, setCurrentIndex] = useAtom(setCurrentIndexAtom);

  const handleRestart = () => {
    setCurrentIndex(0);
    resetAll();
    router.push('/test/question');
  };

  return (
    <>
      {pathname === '/signup/additional' && (
        <Link
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-2%] cursor-pointer"
          href={'/'}
          role="button"
        >
          건너뛰기
        </Link>
      )}
      {pathname === '/test/question' && (
        <Link
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-2%] cursor-pointer"
          href={'/'}
          role="button"
        >
          중단하기
        </Link>
      )}
      {pathname.startsWith('/test/result') && (
        <button
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-2%] cursor-pointer"
          onClick={handleRestart}
        >
          다시하기
        </button>
      )}
    </>
  );
}
