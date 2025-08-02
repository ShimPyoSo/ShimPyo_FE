'use client';

import { useEffect, useState } from 'react';

import { IWeeklyWeather } from '../type';
import axios from 'axios';

export function useFetchWeeklyWeather() {
  const [weather, setWeather] = useState<IWeeklyWeather[]>(() =>
    Array(7)
      .fill(null)
      .map(() => ({
        weather: '맑음',
        minTemp: 23,
        maxTemp: 33,
      }))
  );

  useEffect(() => {
    const fetchWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get('/api/weather/weekly', {
              params: {
                lat: latitude,
                lon: longitude,
              },
            });

            const items = response.data;
            console.log(items);
            setWeather(items);
          } catch {
            alert('날씨 정보를 불러오지 못했습니다.');
          }
        },
        () => {
          alert('위치 정보를 가져올 수 없습니다.');
        }
      );
    };

    fetchWeather();
  }, []);

  return { weather };
}
