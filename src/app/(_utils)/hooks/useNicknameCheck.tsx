import { useRef, useState } from 'react';

import axios from 'axios';

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
        await axios.get(`/nickname?nickname=${nickname}`, { withCredentials: true });
        setIsAvailable(true);
      } catch (error) {
        console.error(error);
        setIsAvailable(null);
      }
    }, 500);
  };

  return { isAvailable, checkDuplicate };
}
