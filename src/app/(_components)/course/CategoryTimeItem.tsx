import Image from 'next/image';
import line from '/public/images/icons/course/line.svg';
import svg from '/public/images/icons/course/time.svg';

interface CategoryIconItemProps {
  isLast?: boolean;
}

export default function CategoryTimeItem({ isLast = false }: CategoryIconItemProps) {
  return (
    <li className="flex flex-col items-center">
      <div className="relative">
        <Image src={svg} alt="시간" width={48} height={30} />
        <span className="absolute top-[3px] left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gn10 tracking-[-2%]">
          10:00
        </span>
      </div>

      {isLast || <Image src={line} alt="선" width={2} height={86} />}
    </li>
  );
}
