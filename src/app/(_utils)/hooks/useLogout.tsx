'use client';

import axios, { AxiosError } from 'axios';

import { IError } from '../type';
import { logoutAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useHandleTokenExpired } from './useHandleTokenExpired';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const [, logout] = useAtom(logoutAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/logout`, {}, { withCredentials: true });
      logout();
      localStorage.removeItem('isRememberMe');
      router.push('/');
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/logout`,
            {},
            { withCredentials: true }
          );
          logout();
          localStorage.removeItem('isRememberMe');
          router.push('/');
        } catch {
          logout();
          localStorage.removeItem('isRememberMe');
          router.push('/');
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return { handleLogout };
}
