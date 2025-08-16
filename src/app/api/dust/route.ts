import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location') || '';

  const apiKey = process.env.DUST_SERVICE_KEY;
  const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&sidoName=${location}&ver=1.0`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(Number(data.response.body.items[0].pm10Grade));
}
