import Image from 'next/image';
import Link from 'next/link';
import noResult from '/public/images/noResult.svg';

export default function NoResult({ type }: { type: 'search' | 'category' }) {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        type === 'search' ? 'h-[calc(100vh-220px)]' : 'h-[calc(100vh-500px)]'
      }`}
    >
      <Image className="mb-[24px]" src={noResult} alt="결과 없음" width={102} height={130} />
      <p className="text-b3 font-semibold tracking-[-0.013em]">검색 결과가 존재하지 않아요</p>
      <span className="mt-[8px] flex gap-[16px] tracking-[-0.02em] text-xs">
        <p className="text-gn1 font-semibold">이런 검색어는 어때요?</p>
        <ul className="text-g1 flex gap-[8px]">
          {['템플스테이', '요가', '촌캉스', '스파', '비건'].map((keyword) => (
            <li key={keyword}>
              <Link href={`/search/${keyword}`}>{keyword}</Link>
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
}
