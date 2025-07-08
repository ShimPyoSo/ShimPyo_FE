'use client';

import { useEffect, useRef } from 'react';

export function useTimer(
  timeLeft: number,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  authState: boolean
) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (authState === true) {
      setTimeLeft(180);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
          const newTimeLeft = prev - 1;
          if (newTimeLeft <= 0) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return newTimeLeft;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [authState, setTimeLeft]);

  return timeLeft;
}
