'use client';

import { useEffect, useState } from 'react';

import { ILocation } from '../type';
import { REGION_MAP } from '../constants';
import axios from 'axios';

export function useFetchDust(location: ILocation | null) {
  const [dust, setDust] = useState(null);

  useEffect(() => {
    const fetchDust = async () => {
      try {
        const response = await axios.get('/api/dust', {
          params: {
            location: REGION_MAP[location?.region_1depth_name ?? ''] || '전국',
          },
        });

        const items = response.data;
        setDust(items);
      } catch {
        alert('날씨 정보를 불러오지 못했습니다.');
      }
    };

    fetchDust();
  }, [location]);

  return { dust };
}
