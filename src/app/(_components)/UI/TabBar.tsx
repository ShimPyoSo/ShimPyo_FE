'use client';

import TabItem from './TabItem';
import home from '/public/images/icons/tabbar/home.svg';
import homeActive from '/public/images/icons/tabbar/homeActive.svg';
import mypage from '/public/images/icons/tabbar/mypage.svg';
import mypageActive from '/public/images/icons/tabbar/mypageActive.svg';
import { rendering } from '@/app/(_utils)/constants';
import search from '/public/images/icons/tabbar/search.svg';
import searchActive from '/public/images/icons/tabbar/searchActive.svg';
import test from '/public/images/icons/tabbar/test.svg';
import testActive from '/public/images/icons/tabbar/testActive.svg';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();

  if (!rendering.includes(pathname) && !pathname.startsWith('/search')) return null;

  return (
    <nav className="fixed bottom-0 rounded-t-3xl bg-gn11 w-[375px]">
      <ul className="flex justify-between items-center text-sm text-b3 pt-[20px] pb-[20px]">
        <TabItem href="/" icon={home} activeIcon={homeActive} label="홈" active={pathname === '/'} />
        <TabItem
          href="/search"
          icon={search}
          activeIcon={searchActive}
          label="검색"
          active={pathname.startsWith('/search')}
        />
        <TabItem
          href="/test"
          icon={test}
          activeIcon={testActive}
          label="쉼표 테스트"
          active={pathname.startsWith('/test')}
        />
        <TabItem
          href="/mypage"
          icon={mypage}
          activeIcon={mypageActive}
          label="마이페이지"
          active={pathname.startsWith('/mypage')}
        />
      </ul>
    </nav>
  );
}
