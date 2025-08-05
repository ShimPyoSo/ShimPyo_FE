'use client';

import { IError, IMember } from './(_utils)/type';
import axios, { AxiosError } from 'axios';
import { hydratedAtom, isHydratedAtom, isLoggedInAtom, loginAtom } from './(_store)/auth';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import Alert from './(_components)/UI/Alert';
import { useNavigationHistory } from './(_utils)/hooks/useNavigationHistory';
import { useRouter } from 'next/navigation';

export default function ClientSideEffectWrapper() {
  const [, setHydrated] = useAtom(hydratedAtom);
  const isHydrated = useAtomValue(isHydratedAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [, login] = useAtom(loginAtom);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const router = useRouter();
  useNavigationHistory(); // 이전 페이지 관리

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

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
          login(response.data);
        } catch (error) {
          const err = error as AxiosError<IError>;
          if (err.response?.data?.name === 'INVALID_REFRESH_TOKEN') {
            localStorage.removeItem('isRememberMe');
            setIsSessionExpired(true);
          }
          console.log(err.response?.data?.message);
        }
      };

      doRelogin();
    }
  }, [isHydrated, isLoggedIn, login]);

  return (
    <>
      {isSessionExpired && (
        <Alert
          title="로그인 만료"
          description={'세션이 만료되어 로그아웃되었습니다.\n로그인 페이지로 이동합니다.'}
          confirmText="확인"
          setIsOpen={setIsSessionExpired}
          onConfirm={() => {
            router.push('/login');
          }}
        />
      )}
    </>
  );
}
