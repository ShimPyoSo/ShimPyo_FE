'use client';

import {
  addScoreAtom,
  answeredAtom,
  currentIndexAtom,
  resetAllAtom,
  setCurrentIndexAtom,
  setOptionalAtom,
} from '@/app/(_store)/test';
import { optionals, questions } from '@/app/(_utils)/constants';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { getWellnessType } from '../getWellnessType';
import { useRouter } from 'next/navigation';

export default function useQuestion() {
  const answered = useAtomValue(answeredAtom);
  const currentIndex = useAtomValue(currentIndexAtom);
  const [, setOptional] = useAtom(setOptionalAtom);
  const [, setAnswered] = useAtom(addScoreAtom);
  const [, resetAll] = useAtom(resetAllAtom);
  const [, setCurrentIndex] = useAtom(setCurrentIndexAtom);
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState(-1);

  const router = useRouter();

  const handleNext = () => {
    if (selected === -1) return;

    if (currentIndex < 7) {
      const selectedScores = questions[currentIndex].answers[selected].scores;
      setAnswered(selectedScores);
    } else {
      if (currentIndex === 7 && selected !== 6) {
        setOptional({ region: optionals[7].answers[selected] });
      } else if (currentIndex === 8 && selected !== 4) {
        setOptional({ duration: optionals[8].answers[selected] });
      } else if (currentIndex === 9 && selected !== 3) {
        setOptional({ meal: selected });
      }
    }

    setSelected(-1);
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    if (currentIndex === 10) {
      setResult(getWellnessType(answered));
    }
  }, [answered, currentIndex, router, setCurrentIndex, resetAll]);

  useEffect(() => {
    if (result !== null) {
      setCurrentIndex(0);
      resetAll();
      router.push(`/test/result/${encodeURI(result)}`);
    }
  }, [result, setCurrentIndex, resetAll, router]);

  return {
    currentIndex,
    selected,
    setSelected,
    handleNext,
  };
}
