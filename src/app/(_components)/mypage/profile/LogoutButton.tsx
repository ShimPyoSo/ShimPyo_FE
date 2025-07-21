'use client';

import axios from 'axios';
import { logoutAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const [, logout] = useAtom(logoutAtom);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/logout`, {}, { withCredentials: true });
      logout();
      localStorage.removeItem('isRememberMe');
      router.push('/');
    } catch {
      // 로그아웃 실패 시 error 처리 추후 구현
    }
  };

  return (
    <li className="py-[18px] border-b border-w6 flex justify-between items-center">
      로그아웃
      <button className="text-w3 bg-gn1 border-gn5 rounded-md px-[12px] py-[7px]" onClick={handleLogout}>
        로그아웃
      </button>
    </li>
  );
}
