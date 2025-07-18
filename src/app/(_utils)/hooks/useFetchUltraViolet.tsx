'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

export function useFetchUltraViolet() {
  const [ultraviolet, setUltraviolet] = useState(0);

  useEffect(() => {
    const fetchDust = async () => {
      try {
        const response = await axios.get('/api/uv');

        const items = response.data;
        setUltraviolet(items);
      } catch {
        alert('날씨 정보를 불러오지 못했습니다.');
      }
    };

    fetchDust();
  }, []);

  return { ultraviolet };
}
