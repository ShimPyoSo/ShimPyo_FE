import { categoryList } from '@/app/(_utils)/constants';
import { useParams } from 'next/navigation';

export default function CategoryDescription() {
  const { type } = useParams();
  const item = categoryList.find((el) => el.href === (type ?? ''));
  if (!item) return null;

  return (
    <div className="mt-[12px] w-full flex flex-col items-center font-semibold text-lg text-w1 text-center leading-[1.4]">
      <p>
        <span className="font-[kkubulim] text-[#A5D0A6] text-xl">{item.mainDescription}</span>
        {type === 'meditation' && '가'}
      </p>
      <p>{item.subDescription}</p>
    </div>
  );
}
