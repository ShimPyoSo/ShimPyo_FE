'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const HISTORY_KEY = 'history';

export function useNavigationHistory() {
  const pathname = usePathname();

  useEffect(() => {
    // pathname 초기화 URL은 추후 변경될 수 있음
    if (pathname === '/' || pathname === '/login') {
      sessionStorage.removeItem(HISTORY_KEY);
      return;
    }

    const storedHistory = sessionStorage.getItem(HISTORY_KEY);
    let parsedHistory: string[] = storedHistory ? JSON.parse(storedHistory) : [];

    parsedHistory = parsedHistory.filter((path) => path !== pathname);
    const updatedHistory = [...parsedHistory, pathname];

    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  }, [pathname]);
}
