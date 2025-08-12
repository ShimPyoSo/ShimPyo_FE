import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { IOptional } from '../(_utils)/type';
import { atom } from 'jotai';

export const optionalAtom = atomWithStorage<IOptional>(
  'tripState', // localStorage key
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
