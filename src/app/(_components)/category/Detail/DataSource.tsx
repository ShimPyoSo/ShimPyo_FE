import Link from 'next/link';

export default function DataSource() {
  return (
    <>
      <span className="mt-[8px] flex items-center text-xs text-g1 tracking-[-2%]">
        <p className="text-b3">
          <Link href={'https://www.weather.go.kr/w/index.do'} rel="noopener noreferrer" target="_blank">
            기상청
          </Link>
          ,{' '}
          <Link href={'https://knto.or.kr/index'} rel="noopener noreferrer" target="_blank">
            한국관광공사
          </Link>
        </p>
        에서 제공하는 정보예요.
      </span>
      <span className="mt-[20px] flex items-center tracking-[-2%] text-xs text-b3">
        7일간의 관광지 집중률 예측과 기상 예보를 안내해 드립니다.
      </span>
      <p className="text-xs text-g1 tracking-[-2%]">
        제공되는 정보는 기관별 데이터에 기반하며, 실제 상황과 다를 수 있습니다.
      </p>
    </>
  );
}
