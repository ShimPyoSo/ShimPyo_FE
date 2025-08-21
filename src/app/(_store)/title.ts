import { atom } from 'jotai';

export const headerTitleAtom = atom('');

export const setTitleAtom = atom(null, (get, set, title: string) => {
  set(headerTitleAtom, title);
});
