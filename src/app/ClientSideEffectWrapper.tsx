'use client';

import { IError, IMember } from './(_utils)/type';
import axios, { AxiosError } from 'axios';
import {
  hydratedAtom,
  isHydratedAtom,
  isLoggedInAtom,
  isSessionExpiredAtom,
  loginAtom,
  sessionExpiredAtom,
} from './(_store)/auth';
import { useAtom, useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';

import Alert from './(_components)/UI/Alert';
import { useEffect } from 'react';
import { useHandleTokenExpired } from './(_utils)/hooks/useHandleTokenExpired';
import { useNavigationHistory } from './(_utils)/hooks/useNavigationHistory';

export default function ClientSideEffectWrapper() {
  const [, setHydrated] = useAtom(hydratedAtom);
  const isHydrated = useAtomValue(isHydratedAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isSessionExpired = useAtomValue(isSessionExpiredAtom);
  const [, login] = useAtom(loginAtom);
  const [, sessionExpired] = useAtom(sessionExpiredAtom);
  const { handleRefreshExpired } = useHandleTokenExpired();

  const router = useRouter();
  const pathname = usePathname();
  useNavigationHistory(); // 이전 페이지 관리

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const isRememberMe = localStorage.getItem('isRememberMe') === 'true';
    if (isHydrated && !isLoggedIn && isRememberMe) {
      const doRelogin = async () => {
        try {
          const response = await axios.post<IMember>(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/relogin`,
            {},
            { withCredentials: true }
          );
          login({
            user: response.data,
            loginType: 'email',
          });
        } catch (error) {
          const err = error as AxiosError<IError>;
          handleRefreshExpired(err.response?.data?.name);
          console.log(err.response?.data?.message);
        }
      };

      doRelogin();
    }
  }, [isHydrated, isLoggedIn, login, handleRefreshExpired]);

  return (
    <>
      {isSessionExpired && (
        <Alert
          title="로그인 만료"
          description={'안전한 서비스 이용을 위해 자동 로그아웃 되었어요🔒\n계속 이용하시려면 다시 로그인해 보세요'}
          confirmText="확인"
          setIsOpen={sessionExpired}
          onConfirm={() => {
            router.push('/login');
          }}
        />
      )}
    </>
  );
}
