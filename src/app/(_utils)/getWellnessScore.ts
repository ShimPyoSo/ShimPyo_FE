import { IWeather } from './type';

interface WellnessInputs {
  weather: IWeather;
  dust: number;
  ultraviolet: number;
}

function getWeatherStateScore(state: string | null): number {
  const scoreMap: Record<string, number> = {
    맑음: 20,
    '구름 많음': 17,
    흐림: 15,
    소나기: 10,
    비: 7,
    '비/눈': 5,
    눈: 5,
  };
  return state ? scoreMap[state] ?? 10 : 10;
}

function getTemperatureScore(temp: number | null): number {
  if (temp === null) return 10;
  const idealMin = 18;
  const idealMax = 24;
  const maxScore = 20;

  if (temp >= idealMin && temp <= idealMax) return maxScore;

  const diff = temp < idealMin ? idealMin - temp : temp - idealMax;

  const penalty = diff * 1.5;
  return Math.max(0, maxScore - penalty);
}

function getRainfallScore(rainfall: number | null): number {
  if (rainfall === null) return 10;
  if (rainfall === 0) return 15;
  if (rainfall <= 5) return Math.round(15 - rainfall);
  if (rainfall <= 10) return Math.round(10 - (rainfall - 5));
  return 0;
}

function getHumidityScore(humidity: number | null): number {
  if (humidity === null) return 5;
  const idealMin = 40;
  const idealMax = 60;
  const maxScore = 10;

  if (humidity >= idealMin && humidity <= idealMax) return maxScore;

  const diff = humidity < idealMin ? idealMin - humidity : humidity - idealMax;

  const penalty = diff * 0.5;
  return Math.max(0, maxScore - penalty);
}

function getDustScore(dust: number): number {
  const scoreMap: Record<number, number> = {
    1: 20,
    2: 13,
    3: 7,
    4: 0,
  };
  return scoreMap[dust] ?? 0;
}

function getUVScore(uv: number): number {
  if (uv <= 2) return 15;
  if (uv <= 5) return 12;
  if (uv <= 8) return 7;
  if (uv <= 10) return 3;
  return 0;
}

export function calculateWellnessScore({ weather, dust, ultraviolet }: WellnessInputs): number {
  const weatherScore = getWeatherStateScore(weather.weather);
  const temperatureScore = getTemperatureScore(weather.temperature);
  const rainfallScore = getRainfallScore(weather.rainfall);
  const humidityScore = getHumidityScore(weather.humidity);
  const dustScore = getDustScore(dust);
  const uvScore = getUVScore(ultraviolet);

  const total = weatherScore + temperatureScore + rainfallScore + humidityScore + dustScore + uvScore;

  return Math.round(total); // 0 ~ 100 사이
}
