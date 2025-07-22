'use client';

import { useParams, useRouter } from 'next/navigation';

import CategoryDescription from './CategoryDescription';
import Image from 'next/image';
import { categoryList } from '@/app/(_utils)/constants';
import { getPrevPathname } from '@/app/(_utils)/getPrevPathname';
import prev from '/public/images/category/categoryArrow.svg';

export default function CategoryHeader() {
  const { type } = useParams();
  const router = useRouter();
  const item = categoryList.find((el) => el.href === (type ?? ''));
  if (!item) return null;

  const handleMoveToPrev = () => {
    const previousPath = getPrevPathname();
    router.push(previousPath);
  };

  return (
    <header
      className="w-full h-[318px] sticky top-0 relative overflow-hidden"
      style={{ backgroundImage: `url('/images/category/${type || 'all'}.png')` }}
    >
      <div className="absolute inset-0 bg-gn4 pointer-events-none">{/* overlay */}</div>
      <div className="py-[16px] flex justify-center items-center relative">
        <button className="absolute left-[16px]" onClick={handleMoveToPrev}>
          <Image src={prev} alt="이전 페이지" width={23} height={23} />
        </button>
        <h1 className="font-semibold text-w3">{item.label}</h1>
      </div>
      <Image className="mt-[36px] mx-auto" src={item.illustration} alt={item.label} width={90} height={90} />
      <CategoryDescription />
    </header>
  );
}
