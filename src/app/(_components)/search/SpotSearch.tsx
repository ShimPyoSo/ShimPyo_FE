import Link from 'next/link';
import SearchInput from './SearchInput';

export default function SpotSearch() {
  return (
    <section className="mt-[30px]">
      <h2 className="font-[kkubulim] text-gn1 text-xl">여행지 찾기</h2>
      <SearchInput />

      <span className="flex gap-[16px] tracking-[-0.02em] text-xs">
        <p className="text-b3 font-semibold">추천 검색어</p>
        <ul className="text-g1 flex gap-[8px]">
          {['템플스테이', '요가', '촌캉스', '스파', '비건'].map((keyword) => (
            <li key={keyword}>
              <Link href={`/search/${keyword}`}>{keyword}</Link>
            </li>
          ))}
        </ul>
      </span>
    </section>
  );
}
