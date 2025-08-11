'use client';

import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';

import { IError } from '../type';
import { optionals } from '@/app/(_utils)/constants';
import { useHandleTokenExpired } from './useHandleTokenExpired';
import { useRouter } from 'next/navigation';

export default function useQuestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<{ [key: number]: number }>({});
  const [optional, setOptional] = useState<string[]>([]);
  const [selected, setSelected] = useState(-1);
  const router = useRouter();
  const { handleAccessExpired } = useHandleTokenExpired();

  const answeredRef = useRef(answered);
  const optionalRef = useRef(optional);

  useEffect(() => {
    answeredRef.current = answered;
  }, [answered]);

  useEffect(() => {
    optionalRef.current = optional;
  }, [optional]);

  const handleNext = () => {
    if (selected === -1) return;

    if (currentIndex < 7) {
      setAnswered((prev) => ({
        ...prev,
        [currentIndex + 1]: selected + 1,
      }));
    } else {
      setOptional((prev) => [...prev, optionals[currentIndex - 7].answers[selected]]);
    }

    setSelected(-1);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === 10) {
      const fetchResult = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/survey/type`,
            answeredRef.current,
            { withCredentials: true }
          );
          router.push(`/test/result/${encodeURI(response.data.typename)}`);
        } catch (error) {
          const err = error as AxiosError<IError>;
          if (err.response?.data?.name === 'INVALID_TOKEN') {
            handleAccessExpired('INVALID_TOKEN');
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/survey/type`,
                answeredRef.current,
                { withCredentials: true }
              );
              router.push(`/test/result/${encodeURI(response.data.typename)}`);
            } catch {
              // 오류 시 처리
            }
          }
          console.log(err.response?.data?.message);
        }
      };
      fetchResult();
    }
  }, [currentIndex, router, handleAccessExpired]);

  return {
    currentIndex,
    selected,
    setSelected,
    handleNext,
  };
}
