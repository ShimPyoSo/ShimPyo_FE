'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const STORAGE_KEY = 'visitedSpots';
const MAX_SPOTS = 30;

export function useRecentSpots() {
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const existing = localStorage.getItem(STORAGE_KEY);
    const parsed: string[] = existing ? JSON.parse(existing) : [];
    const filtered = parsed.filter((spotId) => spotId !== id);
    const updated = [id, ...filtered];
    const limited = updated.slice(0, MAX_SPOTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  }, [id]);
}
