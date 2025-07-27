'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

export function useFetchWeather() {
  const [weather, setWeather] = useState({ rainfall: null, temperature: null, weather: null, humidity: null });

  useEffect(() => {
    const fetchWeather = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get('/api/weather', {
              params: {
                lat: latitude,
                lon: longitude,
              },
            });

            const items = response.data;
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
