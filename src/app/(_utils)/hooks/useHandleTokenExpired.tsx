'use client';

import axios, { AxiosError } from 'axios';

import { IError } from '../type';
import { sessionExpiredAtom } from '../../(_store)/auth';
import { useAtom } from 'jotai';

export function useHandleTokenExpired() {
  const [, sessionExpired] = useAtom(sessionExpiredAtom);

  const handleAccessExpired = async (errorName: string | undefined) => {
    if (errorName === 'INVALID_TOKEN') {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/reissue`, {}, { withCredentials: true });
      } catch (error) {
        const err = error as AxiosError<IError>;
        handleRefreshExpired(err.response?.data?.name);
      }
    }
  };

  const handleRefreshExpired = (errorName: string | undefined) => {
    if (errorName === 'INVALID_REFRESH_TOKEN') {
      localStorage.removeItem('isRememberMe');
      sessionExpired(true);
    }
  };

  return { handleAccessExpired, handleRefreshExpired };
}
