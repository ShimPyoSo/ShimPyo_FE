import { NextResponse } from 'next/server';
import { dfs_xy_conv } from '@/app/(_utils)/convertGrid';
import { getBaseDateAndTime } from '@/app/(_utils)/getBaseDateAndTime';

function getWeatherDescription(pty: string, sky: string) {
  if (pty === '0') {
    switch (sky) {
      case '1':
        return '맑음';
      case '3':
        return '구름 많음';
      case '4':
        return '흐림';
      default:
        return '맑음/구름';
    }
  }

  switch (pty) {
    case '1':
      return '비';
    case '2':
      return '비/눈';
    case '3':
      return '눈';
    case '4':
      return '소나기';
    default:
      return '알 수 없음';
  }
}

interface WeatherItem {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') || '');
  const lon = parseFloat(searchParams.get('lon') || '');

  const { x: nx, y: ny } = dfs_xy_conv(lat, lon);
  const base = getBaseDateAndTime();

  const apiKey = process.env.WEATHER_SERVICE_KEY;
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&dataType=JSON&base_date=${base.baseDate}&base_time=${base.baseTime}&nx=${nx}&ny=${ny}`;

  const res = await fetch(url);
  const data = await res.json();

  const items = data.response.body.items.item;
  const temperature = items.find((i: WeatherItem) => i.category === 'T1H')?.obsrValue || null;
  const rainfall = items.find((i: WeatherItem) => i.category === 'RN1')?.obsrValue || null;
  const pty = items.find((i: WeatherItem) => i.category === 'PTY')?.obsrValue || null;
  const sky = items.find((i: WeatherItem) => i.category === 'SKY')?.obsrValue || null;

  const weather = pty !== null ? getWeatherDescription(pty, sky) : '정보 없음';

  const result = {
    temperature: temperature !== null ? Number(temperature) : null,
    rainfall: rainfall !== null ? Number(rainfall) : null,
    weather,
  };

  return NextResponse.json(result);
}
