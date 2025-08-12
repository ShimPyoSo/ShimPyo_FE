'use client';

import { optionals, questions } from '@/app/(_utils)/constants';
import { useEffect, useRef, useState } from 'react';

import { IResultScore } from '../type';
import { getWellnessType } from '../getWellnessType';
import { useRouter } from 'next/navigation';

export default function useQuestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [optional, setOptional] = useState<string[]>([]);
  const [answered, setAnswered] = useState<IResultScore>({
    '비우는 쉼표': 0,
    '땀 흘리는 쉼표': 0,
    '숨쉬는 쉼표': 0,
    '어울리는 쉼표': 0,
    '채우는 쉼표': 0,
    '피어나는 쉼표': 0,
    '이완하는 쉼표': 0,
    '이것저것 쉼표': 0,
  });

  const router = useRouter();
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
      const selectedScores = questions[currentIndex].answers[selected].scores;

      setAnswered((prev) => {
        const updatedScores = { ...prev };
        for (const [type, score] of Object.entries(selectedScores)) {
          (updatedScores as Record<string, number>)[type] =
            ((updatedScores as Record<string, number>)[type] || 0) + score;
        }
        return updatedScores;
      });
    } else {
      setOptional((prev) => [...prev, optionals[currentIndex - 7].answers[selected]]);
    }

    setSelected(-1);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === 10) {
      console.log(answeredRef.current);
      const result = getWellnessType(answeredRef.current);
      router.push(`/test/result/${encodeURI(result)}`);
    }
  }, [answered, currentIndex, router]);

  return {
    currentIndex,
    selected,
    setSelected,
    handleNext,
  };
}
