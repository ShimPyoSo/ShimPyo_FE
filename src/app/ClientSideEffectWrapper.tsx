'use client';

import { hydratedAtom, isHydratedAtom, isLoggedInAtom, loginAtom } from './(_store)/auth';

import { IMember } from './(_utils)/type';
import axios from 'axios';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function ClientSideEffectWrapper() {
  const [, setHydrated] = useAtom(hydratedAtom);
  const isHydrated = useAtom(isHydratedAtom);
  const isLoggedIn = useAtom(isLoggedInAtom);
  const [, login] = useAtom(loginAtom);

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
