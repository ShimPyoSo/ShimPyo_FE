'use client';

import { useRouter } from 'next/navigation';

interface WordItemProps {
  isActive: boolean;
  searchWord: string;
}

export default function WordItem({ isActive, searchWord }: WordItemProps) {
  const router = useRouter();

  const handleSearch = (word: string) => {
    if (isActive) {
      const existing = JSON.parse(localStorage.getItem('shimpyo_keywords') || '[]');
      const updated = [word, ...existing.filter((q: string) => q !== word)].slice(0, 10);
      localStorage.setItem('shimpyo_keywords', JSON.stringify(updated));
    }
    router.push(`/search/${encodeURIComponent(word)}`);
  };

  return (
    <li className="w-full border-b border-[#EFF0F2]">
      <button
        className="w-full p-[16px] text-b1 text-sm cursor-pointer text-start"
        onMouseDown={() => handleSearch(searchWord)}
      >
        {searchWord}
      </button>
    </li>
  );
}
