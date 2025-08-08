'use client';

import Image from 'next/image';
import Link from 'next/link';
import { testImages } from '@/app/(_utils)/constants';
import { useParams } from 'next/navigation';

export default function Result() {
  const { type } = useParams();
  if (!type) return null;
  const decodedType = decodeURI((Array.isArray(type) ? type[0] : type) as string);
  const currentItem = testImages.find((item) => item.name === decodedType);
  if (!currentItem) return null;

  return (
    <section>
      <h2 className="mt-[22px] text-center">
        <small className="text-sm text-g1 tracking-[-2%]">{currentItem.description}</small>
        <p className="text-3xl text-[#78B3ED] font-[kkubulim]">{currentItem.name}</p>
      </h2>
      <Image className="mt-[34px]" src={currentItem.image} alt={currentItem.name} width={375} height={420} />
      <Link
        href={`/test/${type}/course`}
        className="block mx-[18px] mt-[70px] text-white bg-gn1 text-center py-[16px] rounded-lg"
        role="button"
      >
        맞춤 쉼표 코스 확인하기
      </Link>
    </section>
  );
}
