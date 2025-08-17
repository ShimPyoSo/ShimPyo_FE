export default function Head() {
  return (
    <>
      <script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_CLIENT_KAKAO_JS_KEY}&autoload=true`}
        async
      />
      <title>쉼표</title>
      <meta name="description" content="당신을 위한 쉼, 웰니스 여행의 시작" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="icon" href="/images/icons/logo.svg" type="image/svg+xml" />
    </>
  );
}
