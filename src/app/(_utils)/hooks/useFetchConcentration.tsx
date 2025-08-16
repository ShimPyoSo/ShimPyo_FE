'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

interface useFetchConcentrationProps {
  address: string;
  name: string;
}

export function useFetchConcentration({ address, name }: useFetchConcentrationProps) {
  const [concentration, setConcentration] = useState<number[]>(() => Array(7).fill(-1));

  useEffect(() => {
    const fetchConcentration = async () => {
      try {
        const response = await axios.get('/api/concentration', {
          params: { address, name },
        });
        const items = response.data;
        if (items !== null) {
          setConcentration(items);
        }
      } catch {
        alert('번잡도 정보를 불러오지 못했습니다.');
      }
    };

    fetchConcentration();
  }, [address, name]);

  return { concentration };
}
