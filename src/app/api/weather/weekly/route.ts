/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';
import { dfs_xy_conv } from '@/app/(_utils)/convertGrid';
import { getBaseDateAndTime } from '@/app/(_utils)/getBaseDateAndTime';
import getTmFc from '@/app/(_utils)/getTmFc';
import weatherAreaNo from '@/data/weatherAreaNo.json';

const simplifyWeather = (desc: string): '맑음' | '흐림' | '비' | '눈' => {
  if (desc.includes('비')) return '비';
  if (desc.includes('눈')) return '눈';
  if (desc.includes('흐림') || desc.includes('구름')) return '흐림';
  return '맑음';
};

function normalize(name: string) {
  return name.replace(/\s/g, '');
}

function extractRegion(address: string) {
  const parts = address.trim().split(/\s+/);
  return parts.slice(0, 2).join(' '); // 1~2단계만
}

function findAreaCode(address: string) {
  const regionStr = normalize(extractRegion(address));
  let bestMatch = '';
  let maxLength = 0;

  for (const item of weatherAreaNo) {
    const itemRegion = normalize(item.지역);
    if (regionStr.includes(itemRegion) && itemRegion.length > maxLength) {
      bestMatch = item.구역코드;
      maxLength = itemRegion.length;
    }
  }

  return bestMatch || '11B10101';
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get('lat') || '');
  const lon = parseFloat(searchParams.get('lon') || '');
  const address = searchParams.get('address') || '';

  const now = new Date();
  const { x: nx, y: ny } = dfs_xy_conv(lat, lon);
  const base = getBaseDateAndTime();

  // 1~3일차 단기예보 조회
  let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.WEATHER_SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${base.baseDate}&base_time=${base.baseTime}&nx=${nx}&ny=${ny}`;
  let res = await fetch(url);
  let data = await res.json();

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

  const regId = findAreaCode(address);

  // 4~7일차 중기예보 (육상날씨) 조회
  const tmfc = getTmFc();
  url = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${process.env.WEEKLY_WEATHER_SERVICE_KEY}&pageNo=1&numOfRows=10&dataType=JSON&regId=${regId}&tmFc=${tmfc}`;
  res = await fetch(url);
  data = await res.json();
  const midItem = data.response.body.items.item[0];

  // 4~7일차 중기예보 (온도) 조회
  url = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?serviceKey=${process.env.WEEKLY_WEATHER_SERVICE_KEY}&pageNo=1&numOfRows=10&dataType=JSON&regId=11B10101&tmFc=${tmfc}`;
  res = await fetch(url);
  data = await res.json();

  const tempItem = data.response.body.items.item[0];
  const isBefore18 = now.getHours() < 18;
  const startDay = isBefore18 ? 5 : 4;
  const endDay = isBefore18 ? 8 : 7;

  for (let day = startDay; day <= endDay; day++) {
    const wfAm = midItem[`wf${day}Am`] ?? '';
    const wfPm = midItem[`wf${day}Pm`] ?? '';

    const combined = wfAm === wfPm ? wfAm : wfPm;
    const simplifiedWeather = simplifyWeather(combined);

    const minTempKey = `taMin${day}`;
    const maxTempKey = `taMax${day}`;

    const minTemp = tempItem[minTempKey] !== undefined ? Number(tempItem[minTempKey]) : NaN;
    const maxTemp = tempItem[maxTempKey] !== undefined ? Number(tempItem[maxTempKey]) : NaN;

    weatherList.push({
      weather: simplifiedWeather,
      minTemp,
      maxTemp,
    });
  }

  return NextResponse.json(weatherList);
}
