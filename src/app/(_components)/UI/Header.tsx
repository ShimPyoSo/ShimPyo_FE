'use client';

import { notRendering, title } from '@/app/(_utils)/constants';

import HeaderButton from './HeaderButton';
import Image from 'next/image';
import { getPrevPathname } from '@/app/(_utils)/getPrevPathname';
import { headerTitleAtom } from '@/app/(_store)/title';
import prev from '/public/images/icons/prevButton.svg';
import { useAtomValue } from 'jotai';
import { useFullPath } from '@/app/(_utils)/hooks/useFullPath';
import { useRouter } from 'next/navigation';

export default function Header() {
  const fullPath = useFullPath();
  const router = useRouter();
  const headerTitle = useAtomValue(headerTitleAtom);

  const handleMoveToPrev = () => {
    const previousPath = getPrevPathname();
    router.push(previousPath);
  };

  if (notRendering.includes(fullPath)) return null;

  return (
    <header className="w-full h-[56px] sticky top-0 bg-w1 flex justify-center items-center relative">
      {fullPath === '/search' ||
        fullPath.startsWith('/test') ||
        fullPath.startsWith('/course/') ||
        fullPath === '/signup/additional' || (
          <button className="absolute left-[16px] top-[16px] cursor-pointer" onClick={handleMoveToPrev}>
            <Image src={prev} alt="이전 페이지" width={23} height={23} />
          </button>
        )}

      <h1 className="font-semibold">{title[fullPath] || headerTitle}</h1>
      <HeaderButton />
    </header>
  );
}
