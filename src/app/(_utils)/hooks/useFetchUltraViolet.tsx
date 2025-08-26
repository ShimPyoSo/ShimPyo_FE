'use client';

import { useEffect, useState } from 'react';

import { ILocation } from '../type';
import axios from 'axios';

export function useFetchUltraViolet(location: ILocation | null) {
  const [ultraviolet, setUltraviolet] = useState<number | null>(null);

  useEffect(() => {
    const fetchDust = async () => {
      try {
        const response = await axios.get('/api/uv', {
          params: {
            oneDepthName: location?.region_1depth_name.replace(/\s/g, ''),
            twoDepthName: location?.region_2depth_name.replace(/\s/g, ''),
            threeDepthName: location?.region_3depth_name.replace(/\s/g, ''),
          },
        });

        const items = response.data;
        setUltraviolet(items);
      } catch {}
    };

    fetchDust();
  }, [location]);

  return { ultraviolet };
}
