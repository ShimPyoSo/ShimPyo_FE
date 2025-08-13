import Image from 'next/image';
import line from '/public/images/icons/course/line.svg';
import temp from '/public/images/icons/course/temp.png';

interface CategoryIconItemProps {
  isLast?: boolean;
}

export default function CategoryIconItem({ isLast = false }: CategoryIconItemProps) {
  return (
    <li className="flex flex-col items-center">
      <Image src={temp} alt="카테고리 아이콘" width={48} height={30} />
      {isLast || <Image src={line} alt="선" width={2} height={86} />}
    </li>
  );
}
