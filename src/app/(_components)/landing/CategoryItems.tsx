import Image from 'next/image';
import Link from 'next/link';
import { categoryList } from '@/app/(_utils)/constants';

export default function CategoryItems({ category, type }: { category: string; type: 'search' | 'like' }) {
  const item = categoryList.find((el) => el.label === category);
  if (!item) return null;

  return (
    <li className="flex flex-col items-center text-xs text-b3">
      <Link
        className="w-[50px] h-[48px] rounded-md border border-gray-300 bg-white mb-[3px] tracking-[-2%] flex justify-center items-center cursor-pointer"
        href={`${type === 'like' ? '/mypage/like/spot/' : '/category/'}${item?.href}`}
      >
        <Image src={item?.icon} alt={item?.label} width={30} height={30} />
      </Link>
      {item.label}
    </li>
  );
}
