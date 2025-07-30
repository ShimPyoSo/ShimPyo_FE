'use client';

import { ISpot } from '../type';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const STORAGE_KEY = 'visitedSpots';

export function useRecentSpots() {
  const { id } = useParams();

  useEffect(() => {
    const newSpot = {
      id: 1,
      title: '비비드요가&웰니스스튜디오',
      image: '/images/sample.jpg',
      category: ['스파'],
      region: '서울',
    }; // 임의 데이터

    const existing = localStorage.getItem(STORAGE_KEY);
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = [...parsed.filter((item: ISpot) => item.id !== newSpot.id), newSpot];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [id]);
}
