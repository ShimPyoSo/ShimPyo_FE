'use client';

import { useCallback } from 'react';

const HISTORY_KEY = 'history';

export function useRemovePath() {
  const removeReviewWrite = useCallback((pathname: string) => {
    const storedHistory = sessionStorage.getItem(HISTORY_KEY);
    if (!storedHistory) return;

    const parsedHistory: string[] = JSON.parse(storedHistory);
    const newHistory = parsedHistory.filter((path) => path !== pathname);

    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  }, []);

  return { removeReviewWrite };
}
