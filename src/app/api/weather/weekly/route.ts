/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { dfs_xy_conv } from '@/app/(_utils)/convertGrid';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') || '');
  const lon = parseFloat(searchParams.get('lon') || '');

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const baseDate = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
  const { x: nx, y: ny } = dfs_xy_conv(lat, lon);

  // 1~3일차 단기예보 조회
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.WEATHER_SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=2300&nx=${nx}&ny=${ny}`;
  const res = await fetch(url);
  const data = await res.json();

  const items = data.response.body.items.item;
  const dates: string[] = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push(d.toISOString().slice(0, 10).replace(/-/g, ''));
  }

  // 1시간 단위 날씨 데이터
  const hourlyWeather: { date: string; time: number; temp: number; weather: string }[] = [];

  for (const date of dates) {
    const times = [...new Set(items.filter((it: any) => it.fcstDate === date).map((it: any) => String(it.fcstTime)))];

    times.forEach((timeStr) => {
      const timeNum = parseInt(timeStr as string, 10) / 100;

      const tempItem = items.find(
        (it: any) => it.fcstDate === date && it.fcstTime === timeStr && it.category === 'TMP'
      );
      const skyItem = items.find((it: any) => it.fcstDate === date && it.fcstTime === timeStr && it.category === 'SKY');
      const ptyItem = items.find((it: any) => it.fcstDate === date && it.fcstTime === timeStr && it.category === 'PTY');

      let desc = '맑음';
      if (ptyItem && ptyItem.fcstValue !== '0') {
        desc = '비';
        if (ptyItem.fcstValue === '3' || ptyItem.fcstValue === '6') desc = '눈';
      } else if (skyItem) {
        if (skyItem.fcstValue === '3' || skyItem.fcstValue === '4') desc = '흐림';
      }

      if (tempItem) {
        hourlyWeather.push({
          date,
          time: timeNum,
          temp: Number(tempItem.fcstValue),
          weather: desc,
        });
      }
    });
  }

  // 시간순 정렬
  hourlyWeather.sort((a, b) => {
    if (a.date === b.date) return a.time - b.time;
    return a.date.localeCompare(b.date);
  });

  return NextResponse.json(hourlyWeather);
}
