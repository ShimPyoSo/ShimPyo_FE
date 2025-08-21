import { IOptional, IResultScore } from '../(_utils)/type';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { atom } from 'jotai';

export const optionalAtom = atomWithStorage<IOptional>(
  'testOptional', // localStorage key
  {
    duration: null,
    region: null,
    meal: null,
  },
  createJSONStorage(() => localStorage)
);

export const setOptionalAtom = atom(null, (get, set, update: Partial<IOptional>) => {
  const prev = get(optionalAtom);
  set(optionalAtom, { ...prev, ...update });
});

export const answeredAtom = atomWithStorage<IResultScore>(
  'testAnswered',
  {
    '비우는 쉼표': 0,
    '땀흘리는 쉼표': 0,
    '숨쉬는 쉼표': 0,
    '피어나는 쉼표': 0,
    '이완하는 쉼표': 0,
    '이것저것 쉼표': 0,
  },
  createJSONStorage(() => localStorage)
);

export const resetAllAtom = atom(null, (_get, set) => {
  set(optionalAtom, {
    duration: null,
    region: null,
    meal: null,
  });

  set(answeredAtom, {
    '비우는 쉼표': 0,
    '땀흘리는 쉼표': 0,
    '숨쉬는 쉼표': 0,
    '피어나는 쉼표': 0,
    '이완하는 쉼표': 0,
    '이것저것 쉼표': 0,
  });
});

export const addScoreAtom = atom(null, (get, set, update: Partial<IResultScore>) => {
  const prev = get(answeredAtom);
  const newScores = { ...prev };

  for (const [type, score] of Object.entries(update)) {
    const key = type as keyof IResultScore;
    newScores[key] = (newScores[key] || 0) + (score ?? 0);
  }

  set(answeredAtom, newScores);
});

export const currentIndexAtom = atomWithStorage<number>(
  'testCurrentIndex',
  0,
  createJSONStorage(() => localStorage)
);

export const setCurrentIndexAtom = atom(null, (_get, set, newValue: number) => {
  set(currentIndexAtom, newValue);
});
