'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import axios from 'axios';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import like from '/public/images/icons/like.svg';
import noLike from '/public/images/icons/no-like.svg';
import { useAtomValue } from 'jotai';
import { useMutation } from '@tanstack/react-query';

interface LikedProps {
  liked: boolean;
  id: number;
}

export default function Liked({ liked, id }: LikedProps) {
  const [isLiked, setIsLiked] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isLoggedIn) return;
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/likes`,
        { id },
        {
          withCredentials: true,
        }
      );
      return res.data;
    },
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
