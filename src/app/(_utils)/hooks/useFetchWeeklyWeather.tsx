'use client';

import { useEffect, useState } from 'react';

import { IWeeklyWeather } from '../type';
import axios from 'axios';

interface useFetchWeeklyWeatherProps {
  latitude: number;
  longitude: number;
  address: string;
}

export function useFetchWeeklyWeather({ latitude, longitude, address }: useFetchWeeklyWeatherProps) {
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
      try {
        const response = await axios.get('/api/weather/weekly', {
          params: {
            lat: latitude,
            lon: longitude,
            address: address,
          },
        });

        const items = response.data;
        setWeather(items);
      } catch {
        alert('날씨 정보를 불러오지 못했습니다.');
      }
    };

    fetchWeather();
  }, [latitude, longitude, address]);

  return { weather };
}
