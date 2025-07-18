import { NextResponse } from 'next/server';

function getCurrentTimeKey() {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');

  return `${year}${month}${day}${hour}`;
}

export async function GET() {
  const apiKey = process.env.UV_SERVICE_KEY;
  const url = `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&areaNo=1100000000&time=${getCurrentTimeKey()}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(Number(data.response.body.items.item[0].h0));
}
