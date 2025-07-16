'use client';

import Link from 'next/link';
import ProtectedRoute from '@/app/ProtectedRoute';
import { useAtom } from 'jotai';
import { userAtom } from '@/app/(_store)/auth';

export default function Mypage() {
  const [user] = useAtom(userAtom);

  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <ul className="text-xs text-b3 tracking-[-2%]">
          <li className="py-[18px]">
            <span className="flex items-center gap-[3px]">
              <p className="font-[kkubulim] text-gn1 text-lg">{user?.nickname || '닉네임'}</p>님
            </span>
          </li>
          <li className="py-[18px] border-b border-w6">
            <Link href={'/mypage/profile'}>계정 관리</Link>{' '}
          </li>
          <li className="py-[18px] border-b border-w6">
            <Link href={'/mypage/like'}>찜한 목록</Link>
          </li>
          <li className="py-[18px] border-b border-w6">
            <Link href={'/mypage/service'}>서비스 안내</Link>
          </li>
        </ul>
      </div>
    </ProtectedRoute>
  );
}
