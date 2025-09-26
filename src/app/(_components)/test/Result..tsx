'use client';

import { ICourse, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { optionalAtom, resetAllAtom, setCurrentIndexAtom } from '@/app/(_store)/test';
import { useAtom, useAtomValue } from 'jotai';

import Image from 'next/image';
import { testImages } from '@/app/(_utils)/constants';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useParams } from 'next/navigation';

interface ResultProps {
  setCourse: React.Dispatch<React.SetStateAction<ICourse | null>>;
}

export default function Result({ setCourse }: ResultProps) {
  const { type } = useParams();
  const [, resetAll] = useAtom(resetAllAtom);
  const [, setCurrentIndex] = useAtom(setCurrentIndexAtom);
  const optional = useAtomValue(optionalAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  if (!type) return null;
  const decodedType = decodeURI((Array.isArray(type) ? type[0] : type) as string);
  const currentItem = testImages.find((item) => item.name === decodedType);
  if (!currentItem) return null;

  const handleFetchCourse = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/survey/course`,
        {
          typename: decodedType,
          ...optional,
        },
        { withCredentials: true }
      );
      setCourse(res.data);
      setCurrentIndex(0);
      resetAll();
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        await handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/survey`,
            {
              typename: decodedType,
              ...optional,
            },
            { withCredentials: true }
          );
          setCourse(res.data);
          setCurrentIndex(0);
          resetAll();
        } catch {
          // reissue 이후 오류 처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="mt-[22px] text-center">
        <small className="text-sm text-g1 tracking-[-0.02em]">{currentItem.description}</small>
        <p
          className="mt-[5px] text-3xl font-[kkubulim]"
          style={{
            color: currentItem.color,
          }}
        >
          {currentItem.name}
        </p>
      </h2>
      <Image className="mt-[12px]" src={currentItem.image} alt={currentItem.name} width={375} height={420} />
      <button
        className="mt-[18px] text-white bg-gn1 text-center py-[16px] px-[97px] rounded-lg font-semibold"
        onClick={handleFetchCourse}
      >
        맞춤 쉼표 코스 확인하기
      </button>
    </section>
  );
}
