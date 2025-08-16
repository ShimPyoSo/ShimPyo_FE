import { NextResponse } from 'next/server';
import uvAreaNo from '@/data/uvAreaNo.json';

function normalize(name?: string) {
  return name ? name.replace(/\s/g, '') : '';
}

function findBestMatch(oneDepth?: string, twoDepth?: string, threeDepth?: string) {
  const n1 = normalize(oneDepth);
  const n2 = normalize(twoDepth);
  const n3 = normalize(threeDepth);

  let bestMatch = uvAreaNo.find(
    (row) => normalize(row['1단계']) === n1 && normalize(row['2단계']) === n2 && normalize(row['3단계']) === n3
  );
  if (bestMatch) return bestMatch['행정구역코드'];

  bestMatch = uvAreaNo.find((row) => normalize(row['1단계']) === n1 && normalize(row['2단계']) === n2 && !row['3단계']);
  if (bestMatch) return bestMatch['행정구역코드'];

  bestMatch = uvAreaNo.find((row) => normalize(row['1단계']) === n1 && !row['2단계']);
  if (bestMatch) return bestMatch['행정구역코드'];

  return 1100000000;
}

function getCurrentTimeKey() {
  const now = new Date();

  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');

  return `${year}${month}${day}${hour}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const oneDepthName = searchParams.get('oneDepthName') || '';
  const twoDepthName = searchParams.get('twoDepthName') || '';
  const threeDepthName = searchParams.get('threeDepthName') || '';

  const areaNo = findBestMatch(oneDepthName, twoDepthName, threeDepthName);

  const apiKey = process.env.UV_SERVICE_KEY;
  const url = `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=${apiKey}&pageNo=1&numOfRows=10&dataType=JSON&areaNo=${areaNo}&time=${getCurrentTimeKey()}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(Number(data.response.body.items.item[0].h0));
}
