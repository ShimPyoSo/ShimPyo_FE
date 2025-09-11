'use client';

import CategoryDescription from './CategoryDescription';
import Image from 'next/image';
import { categoryList } from '@/app/(_utils)/constants';
import { useSearchParams } from 'next/navigation';

export default function CategoryHeader() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? '';

  const item = categoryList.find((el) => el.href === (type ?? ''));
  if (!item) return null;

  return (
    <header
      className="w-full h-[262px] sticky top-0 relative overflow-hidden"
      style={{ backgroundImage: `url('/images/category/${type || 'all'}.png')` }}
    >
      <div className="absolute inset-0 bg-gn4 pointer-events-none">{/* overlay */}</div>
      <Image className="mt-[50px] mx-auto" src={item.illustration} alt={item.label} width={90} height={90} />
      <CategoryDescription />
    </header>
  );
}
