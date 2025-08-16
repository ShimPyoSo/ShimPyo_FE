import concentrationAreaNo from '@/data/concentrationAreaNo.json';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') || '';
  const name = searchParams.get('name');

  if (!name) return Response.json(null);

  const parts = address.trim().split(/\s+/);
  const oneDepth = parts[0];
  const twoDepth = parts[1];
  const match = concentrationAreaNo.find(
    (item) =>
      item.areaNm.replace(/\s/g, '') === oneDepth.replace(/\s/g, '') &&
      item.sigunguNm.replace(/\s/g, '') === twoDepth.replace(/\s/g, '')
  );

  if (!match) return Response.json(null);

  const areaCd = match.areaCd;
  const sigunguCd = match.sigunguCd;

  const url = `https://apis.data.go.kr/B551011/TatsCnctrRateService/tatsCnctrRatedList?serviceKey=${
    process.env.CONCENTRATION_SERVICE_KEY
  }&pageNo=1&numOfRows=7&MobileOS=WEB&MobileApp=shimpyo&areaCd=${areaCd.toString()}&signguCd=${sigunguCd.toString()}&tAtsNm=${encodeURIComponent(
    name
  )}&_type=json`;

  const res = await fetch(url);
  const data = await res.json();

  console.log(data);

  const items = data.response?.body?.items?.item;
  if (!items) return Response.json(null);

  const rates = items.map((i: { cnctrRate: string }) => parseFloat(i.cnctrRate));

  return Response.json(rates);
}
