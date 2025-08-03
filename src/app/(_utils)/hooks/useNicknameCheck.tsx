import axios, { AxiosError } from 'axios';
import { useRef, useState } from 'react';

import { IError } from '../type';

export function useNicknameCheck() {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkDuplicate = (nickname: string) => {
    if (!nickname.trim()) {
      setIsAvailable(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/duplicate?nickname=${nickname}`, {
          withCredentials: true,
        });
        setIsAvailable(true);
      } catch (error) {
        const err = error as AxiosError<IError>;
        if (err.response?.data?.name === 'NICKNAME_DUPLICATED') {
          setIsAvailable(false);
        }
        console.log(err.response?.data?.message);
      }
    }, 500);
  };

  return { isAvailable, checkDuplicate };
}
