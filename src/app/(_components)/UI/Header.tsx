'use client';

import Image from 'next/image';
import prev from '/public/images/icons/prevButton.svg';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const notRendering = ['/', '/signup'];
  const title: { [key: string]: string } = {
    '/signup/email': '회원가입',
  };

  if (notRendering.includes(pathname)) return null;

  return (
    <header className="w-full h-[56px] sticky top-0 bg-w1 flex justify-center items-center relative">
      <button className="absolute left-[16px] top-[16px]">
        <Image src={prev} alt="이전 페이지" width={23} height={23} />
      </button>

      <h1 className="font-semibold">{title[pathname] || '헤더'}</h1>
    </header>
  );
}
