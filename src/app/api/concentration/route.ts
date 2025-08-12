export async function GET() {
  // 관광지 집중률 호출 (현재 간현관광지 고정)
  const url = `https://apis.data.go.kr/B551011/TatsCnctrRateService/tatsCnctrRatedList?serviceKey=${process.env.CONCENTRATION_SERVICE_KEY}&pageNo=1&numOfRows=7&MobileOS=WEB&MobileApp=shimpyo&areaCd=51&signguCd=51130&tAtsNm=%EA%B0%84%ED%98%84%EA%B4%80%EA%B4%91%EC%A7%80&_type=json`;
  const res = await fetch(url);
  const data = await res.json();

  const rates = data.response.body.items.item.map((i: { cnctrRate: string }) => parseFloat(i.cnctrRate));

  return Response.json(rates);
}
