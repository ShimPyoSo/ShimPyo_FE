/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { dfs_xy_conv } from '@/app/(_utils)/convertGrid';
import { getBaseDateAndTime } from '@/app/(_utils)/getBaseDateAndTime';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') || '');
  const lon = parseFloat(searchParams.get('lon') || '');

  const now = new Date();
  const { x: nx, y: ny } = dfs_xy_conv(lat, lon);
  const base = getBaseDateAndTime();

  // 1~3일차 단기예보 조회
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.WEATHER_SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base.baseDate}&base_time=${base.baseTime}&nx=${nx}&ny=${ny}`;
  const res = await fetch(url);
  const data = await res.json();

  const items = data.response.body.items.item;
  const dates: string[] = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push(d.toISOString().slice(0, 10).replace(/-/g, ''));
  }

  const weatherList: { weather: string; minTemp: number; maxTemp: number }[] = [];
  const tempByDate: Record<string, number[]> = {};

  for (const it of items) {
    if (dates.includes(it.fcstDate)) {
      if (it.category === 'TMP') {
        if (!tempByDate[it.fcstDate]) tempByDate[it.fcstDate] = [];
        tempByDate[it.fcstDate].push(Number(it.fcstValue));
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    const targetDate = dates[i];

    const skyItem = items.find(
      (it: any) => it.fcstDate === targetDate && it.fcstTime === '0900' && it.category === 'SKY'
    );
    const ptyItem = items.find(
      (it: any) => it.fcstDate === targetDate && it.fcstTime === '0900' && it.category === 'PTY'
    );

    let desc = '맑음';
    if (ptyItem && ptyItem.fcstValue !== '0') {
      desc = '비';
      if (ptyItem.fcstValue === '3' || ptyItem.fcstValue === '6') desc = '눈';
    } else if (skyItem) {
      if (skyItem.fcstValue === '3' || skyItem.fcstValue === '4') desc = '흐림';
    }

    const temps = tempByDate[targetDate] || [];
    const minTemp = temps.length > 0 ? Math.min(...temps) : NaN;
    const maxTemp = temps.length > 0 ? Math.max(...temps) : NaN;

    weatherList.push({
      weather: desc,
      minTemp,
      maxTemp,
    });
  }

  return NextResponse.json(weatherList);
}
