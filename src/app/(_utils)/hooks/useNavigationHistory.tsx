'use client';

import { useEffect } from 'react';
import { useFullPath } from './useFullPath';

const HISTORY_KEY = 'history';

export function useNavigationHistory() {
  const fullPath = useFullPath();

  useEffect(() => {
    if (fullPath === '/' || fullPath.startsWith('/login')) {
      sessionStorage.removeItem(HISTORY_KEY);
      return;
    }

    const storedHistory = sessionStorage.getItem(HISTORY_KEY);
    let parsedHistory: string[] = storedHistory ? JSON.parse(storedHistory) : [];

    parsedHistory = parsedHistory.filter((path) => path !== fullPath);
    const updatedHistory = [...parsedHistory, fullPath];

    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  }, [fullPath]);
}
