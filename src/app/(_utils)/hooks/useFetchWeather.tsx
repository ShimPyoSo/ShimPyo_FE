'use client';

import { useEffect, useState } from 'react';

import { IWeather } from '../type';
import axios from 'axios';

export function useFetchWeather() {
  const [weather, setWeather] = useState<IWeather>({
    rainfall: null,
    temperature: null,
    weather: null,
    humidity: null,
  });

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
        async () => {
          const response = await axios.get('/api/weather', {
            params: {
              lat: 37.5665,
              lon: 126.978,
            },
          });

          const items = response.data;
          setWeather(items);
        }
      );
    };

    fetchWeather();
  }, []);

  return { weather };
}
