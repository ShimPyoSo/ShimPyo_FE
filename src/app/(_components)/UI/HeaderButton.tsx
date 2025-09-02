'use client';

import { resetAllAtom, setCurrentIndexAtom } from '@/app/(_store)/test';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import cancel from '/public/images/icons/cancel.svg';
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
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-0.02em] cursor-pointer"
          href={'/'}
          role="button"
        >
          건너뛰기
        </Link>
      )}
      {pathname === '/test/question' && (
        <Link
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-0.02em] cursor-pointer"
          href={'/test'}
          role="button"
        >
          중단하기
        </Link>
      )}
      {pathname.startsWith('/test/result') && (
        <button
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-0.02em] cursor-pointer"
          onClick={handleRestart}
        >
          다시하기
        </button>
      )}
      {pathname.startsWith('/course/') && (
        <Image
          className="absolute right-[16px] top-[18px] cursor-pointer"
          src={cancel}
          alt="닫기"
          width={24}
          height={24}
          role="button"
          onClick={() => window.close()}
        />
      )}
    </>
  );
}
