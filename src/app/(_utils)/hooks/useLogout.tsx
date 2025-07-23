'use client';

import axios from 'axios';
import { logoutAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const [, logout] = useAtom(logoutAtom);

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

  return { handleLogout };
}
