import Link from 'next/link';
import { testImages } from '@/app/(_utils)/constants';

export default function Test() {
  return (
    <div className="bg-w1 pl-[16px] pb-[70px]">
      {testImages.map((i, idx) => {
        return (
          <Link
            className="block mx-[18px] mt-[10px] text-white bg-gn1 text-center py-[16px] rounded-lg"
            href={`/test/result/${encodeURI(i.name)}`}
            key={idx}
          >
            {i.name} 가기
          </Link>
        );
      })}
    </div>
  );
}
