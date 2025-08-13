'use client';

import { resetAllAtom, setCurrentIndexAtom } from '@/app/(_store)/test';

import Image from 'next/image';
import { testImages } from '@/app/(_utils)/constants';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

interface ResultProps {
  setIsResult: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Result({ setIsResult }: ResultProps) {
  const { type } = useParams();
  const [, resetAll] = useAtom(resetAllAtom);
  const [, setCurrentIndex] = useAtom(setCurrentIndexAtom);

  useEffect(() => {
    setCurrentIndex(0);
    resetAll();
  }, [resetAll, setCurrentIndex]);

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
      <button
        className="block mx-[18px] mt-[70px] text-white bg-gn1 text-center py-[16px] rounded-lg"
        onClick={() => setIsResult(true)}
      >
        맞춤 쉼표 코스 확인하기
      </button>
    </section>
  );
}
