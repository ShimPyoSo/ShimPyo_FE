import { NextResponse } from 'next/server';

const simplifyWeather = (desc: string): '맑음' | '흐림' | '비' | '눈' => {
  if (desc.includes('비')) return '비';
  if (desc.includes('눈')) return '눈';
  if (desc.includes('흐림') || desc.includes('구름')) return '흐림';
  return '맑음';
};

function getTmFc() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hour = now.getHours();

  let timePart = '0600';

  if (hour >= 19) {
    timePart = '1800';
  }

  const tmFc = `${year}${month}${date}${timePart}`;
  return tmFc;
}

export async function GET() {
  const url = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${
    process.env.WEEKLY_WEATHER_SERVICE_KEY
  }&pageNo=1&numOfRows=10&dataType=JSON&regId=11B00000&tmFc=${getTmFc()}`;
  const res = await fetch(url);
  const data = await res.json();

  const item = data.response.body.items.item[0];

  // 4~7일 오전/오후 날씨 추출 및 간단화
  const result: Record<number, string> = {};
  for (let day = 4; day <= 7; day++) {
    const wfAm = item[`wf${day}Am`] ?? '';
    const wfPm = item[`wf${day}Pm`] ?? '';

    // 오전, 오후가 다르면 오후 값으로 대체
    const combined = wfAm === wfPm ? wfAm : wfPm;
    result[day - 1] = simplifyWeather(combined);
  }

  return NextResponse.json(result);
}
