import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { IMember } from '../(_utils)/type';
import { atom } from 'jotai';

export const isLoggedInAtom = atomWithStorage(
  'isLoggedIn',
  false,
  createJSONStorage(() => sessionStorage)
);

export const userAtom = atomWithStorage<IMember | null>(
  'user',
  null,
  createJSONStorage(() => sessionStorage)
);

export const loginAtom = atom(null, (get, set, user: IMember) => {
  set(isLoggedInAtom, true);
  set(userAtom, user);
});

export const logoutAtom = atom(null, (get, set) => {
  set(isLoggedInAtom, false);
  set(userAtom, null);
});

export const updateNicknameAtom = atom(null, (get, set, newNickname: string) => {
  const user = get(userAtom);
  if (user) {
    set(userAtom, {
      ...user,
      nickname: newNickname,
    });
  }
});

export const isHydratedAtom = atom(false);
export const hydratedAtom = atom(
  (get) => get(isHydratedAtom),
  (get, set) => {
    set(isHydratedAtom, true);
  }
);
