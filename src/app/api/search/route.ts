import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'query is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
      params: { query },
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
      },
    });

    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
