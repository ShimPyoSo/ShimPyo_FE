'use client';

import Link from 'next/link';
import ProtectedRoute from '@/app/ProtectedRoute';
import { useAtom } from 'jotai';
import { useLogout } from '@/app/(_utils)/hooks/useLogout';
import { userAtom } from '@/app/(_store)/auth';

export default function Mypage() {
  const [user] = useAtom(userAtom);
  const { handleLogout } = useLogout();

  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <ul className="text-xs text-b3 tracking-[-2%]">
          <li className="py-[18px] flex items-center justify-between">
            <span className="flex items-center gap-[3px]">
              <p className="font-[kkubulim] text-gn1 text-lg">{user?.nickname || '닉네임'}</p>님
            </span>
            <button className="text-w3 bg-gn1 border-gn5 rounded-md px-[12px] py-[7px]" onClick={handleLogout}>
              로그아웃
            </button>
          </li>

          <li className="border-b border-w6">
            <Link href="/mypage/profile" className="block py-[18px] w-full">
              계정 관리
            </Link>
          </li>
          <li className="border-b border-w6">
            <Link href="/mypage/like" className="block py-[18px] w-full">
              찜한 여행지
            </Link>
          </li>
          <li className="border-b border-w6">
            <Link href="/mypage/review" className="block py-[18px] w-full">
              내가 쓴 후기
            </Link>
          </li>
          <li className="border-b border-w6">
            <Link href="/mypage/service" className="block py-[18px] w-full">
              서비스 안내
            </Link>
          </li>
        </ul>
      </div>
    </ProtectedRoute>
  );
}
