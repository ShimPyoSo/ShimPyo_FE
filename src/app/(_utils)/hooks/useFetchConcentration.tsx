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
        // 번잡도 불러오기 오류
      }
    };

    fetchConcentration();
  }, [address, name]);

  return { concentration };
}
