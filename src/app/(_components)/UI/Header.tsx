'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'next/image';
import { getPrevPathname } from '@/app/(_utils)/getPrevPathname';
import prev from '/public/images/icons/prevButton.svg';
import { title } from '@/app/(_utils)/constants';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const notRendering = ['/', '/signup'];

  const handleMoveToPrev = () => {
    const previousPath = getPrevPathname();
    router.push(previousPath);
  };

  if (notRendering.includes(pathname)) return null;

  return (
    <header className="w-full h-[56px] sticky top-0 bg-w1 flex justify-center items-center relative">
      <button className="absolute left-[16px] top-[16px]" onClick={handleMoveToPrev}>
        <Image src={prev} alt="이전 페이지" width={23} height={23} />
      </button>

      <h1 className="font-semibold">{title[pathname] || '헤더'}</h1>
    </header>
  );
}
