import { IOptional, IResultScore, IScore } from '../(_utils)/type';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { decryptData, encryptData } from '../(_utils)/crypto';

import { atom } from 'jotai';

export const optionalAtom = atomWithStorage<IOptional>(
  'testOptional',
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

export const answeredAtom = atomWithStorage<Partial<IResultScore>[]>(
  'testAnswered',
  Array.from({ length: 7 }),
  createJSONStorage(() => ({
    getItem: (key: string) => {
      const cipher = localStorage.getItem(key);
      if (!cipher) return null;
      try {
        const decrypted = decryptData(cipher);
        return JSON.stringify(decrypted);
      } catch {
        console.warn('Failed to decrypt answeredAtom');
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      const data: Partial<IResultScore>[] = JSON.parse(value);
      const cipher = encryptData(data);
      localStorage.setItem(key, cipher);
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
    },
  }))
);

export const resetAllAtom = atom(null, (_get, set) => {
  set(optionalAtom, {
    duration: null,
    region: null,
    meal: null,
  });

  set(answeredAtom, Array.from({ length: 7 }));
});

export const addScoreAtom = atom(null, (get, set, update: IScore) => {
  const prev = get(answeredAtom);
  const newScores = [...prev];

  newScores[update.index] = update.scores;

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
