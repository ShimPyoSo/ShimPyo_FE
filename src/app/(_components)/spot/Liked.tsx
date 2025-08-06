'use client';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { IError } from '@/app/(_utils)/type';
import Image from 'next/image';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import like from '/public/images/icons/like.svg';
import noLike from '/public/images/icons/no-like.svg';
import { useAtomValue } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useMutation } from '@tanstack/react-query';

interface LikedProps {
  liked: boolean;
  id: number;
}

export default function Liked({ liked, id }: LikedProps) {
  const [isLiked, setIsLiked] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const { handleAccessExpired } = useHandleTokenExpired();

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleSpotLiked = async () => {
    if (!isLoggedIn) return;
    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/tourist`,
        { id },
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/course/tourist`,
            { id },
            {
              withCredentials: true,
            }
          );
          return res.data;
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  const mutation = useMutation({
    mutationFn: handleSpotLiked,
    onSuccess: () => {
      setIsLiked((prev) => !prev);
    },
    onError: (err) => {
      console.log(err); // 에러 시 추후 수정
    },
  });

  return (
    <button onClick={() => mutation.mutate()}>
      <Image
        className={`cursor-pointer ${isLoggedIn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        src={isLiked ? like : noLike}
        alt="쉼표"
        width={24}
        height={24}
        onClick={() => setIsLiked(!isLiked)}
        aria-hidden={!isLoggedIn}
      />
    </button>
  );
}
