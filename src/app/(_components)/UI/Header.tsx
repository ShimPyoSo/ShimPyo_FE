'use client';

import { notRendering, title } from '@/app/(_utils)/constants';
import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import { getPrevPathname } from '@/app/(_utils)/getPrevPathname';
import prev from '/public/images/icons/prevButton.svg';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleMoveToPrev = () => {
    const previousPath = getPrevPathname();
    router.push(previousPath);
  };

  if (notRendering.includes(pathname)) return null;

  return (
    <header className="w-full h-[56px] sticky top-0 bg-w1 flex justify-center items-center relative">
      {pathname === '/search' || (
        <button className="absolute left-[16px] top-[16px] cursor-pointer" onClick={handleMoveToPrev}>
          <Image src={prev} alt="이전 페이지" width={23} height={23} />
        </button>
      )}

      <h1 className="font-semibold">{title[pathname] || '헤더'}</h1>

      {pathname === '/signup/additional' && (
        <Link
          className="absolute right-[16px] top-[18px] text-g1 text-xs tracking-[-2%] cursor-pointer"
          href={'/'}
          role="button"
        >
          건너뛰기
        </Link>
      )}
    </header>
  );
}
