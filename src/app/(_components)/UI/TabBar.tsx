'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  const notRendering = ['/search', '/login', '/singup', '/find', '/chat', '/mypage/nickname'];
  const isChatRoute = pathname.startsWith('/chat/') && pathname.split('/').length === 4;

  if (notRendering.includes(pathname) || isChatRoute) return null;
  return (
    <nav className="border-t border-[#EAEAEA] px-[24px] py-[12px] bg-w1 w-full">
      <ul className="flex justify-between items-center text-xs font-semibold text-[#757575]">
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/'}>
            홈
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/search'}>
            검색
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/chatlist'}>
            채팅목록
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/mychat'}>
            내 채팅
          </Link>
        </li>
        <li>
          <Link className="min-w-[55px] flex flex-col items-center" href={'/mypage'}>
            마이페이지
          </Link>
        </li>
      </ul>
    </nav>
  );
}
