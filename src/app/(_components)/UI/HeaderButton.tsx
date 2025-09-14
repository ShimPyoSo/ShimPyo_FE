'use client';

import { resetAllAtom, setCurrentIndexAtom } from '@/app/(_store)/test';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import cancel from '/public/images/icons/cancel.svg';
import { getPrevPathname } from '@/app/(_utils)/getPrevPathname';
import prev from '/public/images/icons/prevButton.svg';
import { useAtom } from 'jotai';
import { useFullPath } from '@/app/(_utils)/hooks/useFullPath';

export default function HeaderButton() {
  const pathname = usePathname();
  const fullPath = useFullPath();
  const router = useRouter();
  const [, resetAll] = useAtom(resetAllAtom);
  const [, setCurrentIndex] = useAtom(setCurrentIndexAtom);

  const handleRestart = () => {
    setCurrentIndex(0);
    resetAll();
    sessionStorage.setItem('history', JSON.stringify(['/test']));
    router.push('/test/question');
  };

  const handleMoveToPrev = () => {
    const previousPath = getPrevPathname();
    router.push(previousPath);
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
        <button className="absolute left-[16px] top-[16px] cursor-pointer">
          <Image src={cancel} alt="메인으로" width={23} height={23} onClick={() => window.close()} />
        </button>
      )}
      {fullPath === '/search' ||
        fullPath.startsWith('/test') ||
        fullPath.startsWith('/course/') ||
        fullPath === '/signup/additional' || (
          <button className="absolute left-[16px] top-[16px] cursor-pointer" onClick={handleMoveToPrev}>
            <Image src={prev} alt="이전 페이지" width={23} height={23} />
          </button>
        )}
    </>
  );
}
