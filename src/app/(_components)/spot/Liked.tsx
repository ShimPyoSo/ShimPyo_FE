'use client';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { IError } from '@/app/(_utils)/type';
import Image from 'next/image';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import like from '/public/images/icons/like.svg';
import noLike from '/public/images/icons/no-like.svg';
import spotLike from '/public/images/icons/spot/like.svg';
import spotNoLike from '/public/images/icons/spot/no-like.svg';
import { useAtomValue } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useMutation } from '@tanstack/react-query';

interface LikedProps {
  liked: boolean;
  id: number;
  type: 'detail' | 'list';
}

export default function Liked({ liked, id, type }: LikedProps) {
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
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        await handleAccessExpired('INVALID_TOKEN');
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

  const iconSrc = (() => {
    if (type === 'list') {
      return isLiked ? like : noLike;
    }
    return isLiked ? spotLike : spotNoLike;
  })();

  return (
    <button
      className="flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <Image
        className={`cursor-pointer ${isLoggedIn ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        src={iconSrc}
        alt="찜"
        width={24}
        height={24}
        aria-hidden={!isLoggedIn}
      />
    </button>
  );
}
