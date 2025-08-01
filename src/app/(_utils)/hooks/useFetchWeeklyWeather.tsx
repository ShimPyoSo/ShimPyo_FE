'use client';

import axios from 'axios';
import { useEffect } from 'react';

export function useFetchWeeklyWeather() {
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('/api/weather/weekly');

        const items = response.data;
        console.log(items);
      } catch {
        alert('날씨 정보를 불러오지 못했습니다.');
      }
    };

    fetchWeather();
  }, []);
}
