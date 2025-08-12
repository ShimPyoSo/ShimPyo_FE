'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

export function useFetchConcentration() {
  const [concentration, setConcentration] = useState<number[]>(() => Array(7).fill(0));

  useEffect(() => {
    const fetchConcentration = async () => {
      try {
        const response = await axios.get('/api/concentration');
        const items = response.data;
        setConcentration(items);
      } catch {
        alert('번잡도 정보를 불러오지 못했습니다.');
      }
    };

    fetchConcentration();
  }, []);

  return { concentration };
}
