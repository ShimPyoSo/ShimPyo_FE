'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import deleteX from '/public/images/icons/delete.svg';

export default function SearchHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const isStoreActive = localStorage.getItem('shimpyo_history');
    if (isStoreActive === 'false') setIsActive(false);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('shimpyo_keywords');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleStoreActive = () => {
    setIsActive(!isActive);
    if (isActive) {
      localStorage.setItem('shimpyo_history', 'false');
    } else {
      localStorage.removeItem('shimpyo_history');
    }
  };

  const handleWordDelete = (word: string) => {
    const updated = history.filter((item) => item !== word);
    setHistory(updated);
    localStorage.setItem('shimpyo_keywords', JSON.stringify(updated));
  };

  return (
    <section className="mt-[70px]">
      <div className="flex items-center justify-between">
        <h2 className="font-[kkubulim] text-gn1 text-xl">최근 검색어</h2>
        <button
          className={`text-xs underline underline-offset-2 ${isActive ? 'text-b3' : 'text-gn1'}`}
          onClick={handleStoreActive}
        >
          최근 검색어 {isActive ? '끄기' : '켜기'}
        </button>
      </div>
      <p className="text-g1 text-sm">
        {history.length > 0 ? '나의 최근 관심 여행지는 어디일까요?' : '지금 휴식을 떠나고 싶은 여행지를 검색해 보세요!'}
      </p>
      <ul className="mt-[16px] text-b3">
        {history.map((word) => (
          <li key={word} className="px-[10px] py-[12px] flex items-center justify-between border-b border-w5">
            <Link href={`/search/${encodeURIComponent(word)}`}>{word}</Link>
            <Image
              src={deleteX}
              alt="삭제"
              width={24}
              height={24}
              role="button"
              onClick={() => handleWordDelete(word)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
