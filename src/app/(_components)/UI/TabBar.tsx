'use client';

import Image from 'next/image';
import Link from 'next/link';
import home from '/public/images/icons/tabbar/home.svg';
import homeActive from '/public/images/icons/tabbar/homeActive.svg';
import mypage from '/public/images/icons/tabbar/mypage.svg';
import mypageActive from '/public/images/icons/tabbar/mypageActive.svg';
import search from '/public/images/icons/tabbar/search.svg';
import searchActive from '/public/images/icons/tabbar/searchActive.svg';
import test from '/public/images/icons/tabbar/test.svg';
import testActive from '/public/images/icons/tabbar/testActive.svg';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  const notRendering = ['/login', '/signup', '/find'];

  if (notRendering.includes(pathname)) return null;
  return (
    <nav className="fixed bottom-0 rounded-t-3xl bg-gn11 w-[375px]">
      <ul className="flex justify-between items-center text-sm text-b3 pt-[20px] pb-[20px]">
        <li>
          <Link
            className={`min-w-[93.75px] flex flex-col items-center ${pathname === '/' ? 'text-gn1' : ''}`}
            href={'/'}
          >
            <Image className="mb-[6px]" src={pathname === '/' ? homeActive : home} alt="홈" width={28} height={28} />홈
          </Link>
        </li>
        <li>
          <Link
            className={`min-w-[93.75px] flex flex-col items-center ${pathname.startsWith('/search') ? 'text-gn1' : ''}`}
            href={'/search'}
          >
            <Image
              className="mb-[6px]"
              src={pathname.startsWith('/search') ? searchActive : search}
              alt="검색"
              width={28}
              height={28}
            />
            검색
          </Link>
        </li>
        <li>
          <Link
            className={`min-w-[93.75px] flex flex-col items-center ${pathname.startsWith('/test') ? 'text-gn1' : ''}`}
            href={'/test'}
          >
            <Image
              className="mb-[6px]"
              src={pathname.startsWith('/test') ? testActive : test}
              alt="쉼표 테스트"
              width={28}
              height={28}
            />
            쉼표 테스트
          </Link>
        </li>
        <li>
          <Link
            className={`min-w-[93.75px] flex flex-col items-center ${pathname.startsWith('/mypage') ? 'text-gn1' : ''}`}
            href={'/mypage'}
          >
            <Image
              className="mb-[6px]"
              src={pathname.startsWith('/mypage') ? mypageActive : mypage}
              alt="마이페이지"
              width={28}
              height={28}
            />
            마이페이지
          </Link>
        </li>
      </ul>
    </nav>
  );
}
