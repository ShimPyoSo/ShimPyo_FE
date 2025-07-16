'use client';

import { hydratedAtom, isHydratedAtom, isLoggedInAtom, loginAtom } from './(_store)/auth';
import { useAtom, useAtomValue } from 'jotai';

import { IMember } from './(_utils)/type';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigationHistory } from './(_utils)/hooks/useNavigationHistory';

export default function ClientSideEffectWrapper() {
  const [, setHydrated] = useAtom(hydratedAtom);
  const isHydrated = useAtomValue(isHydratedAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [, login] = useAtom(loginAtom);
  useNavigationHistory(); // 이전 페이지 관리

  useEffect(() => {
    setHydrated();
  }, [setHydrated]);

  useEffect(() => {
    const isRememberMe = localStorage.getItem('isRememberMe') === 'true';
    if (isHydrated && !isLoggedIn && isRememberMe) {
      const doRelogin = async () => {
        try {
          const response = await axios.post<IMember>('relogin', {}, { withCredentials: true });
          login(response.data);
        } catch (error) {
          console.log(error); // 추후 error 처리 수정
        }
      };

      doRelogin();
    }
  }, [isHydrated, isLoggedIn, login]);

  return null;
}
