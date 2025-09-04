import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { IMember } from '../(_utils)/type';
import { atom } from 'jotai';

export const isLoggedInAtom = atomWithStorage(
  'isLoggedIn',
  false,
  createJSONStorage(() => sessionStorage)
);

export const isSocialAtom = atomWithStorage(
  'isSocial',
  false,
  createJSONStorage(() => sessionStorage)
);

export const userAtom = atomWithStorage<IMember | null>(
  'user',
  null,
  createJSONStorage(() => sessionStorage)
);

export const loginAtom = atom(null, (get, set, { user, loginType }: { user: IMember; loginType: string }) => {
  set(isLoggedInAtom, true);
  set(userAtom, user);
  set(isSocialAtom, loginType === 'social');
});

export const logoutAtom = atom(null, (get, set) => {
  set(isLoggedInAtom, false);
  set(userAtom, null);
  set(isSocialAtom, false);
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

export const isSessionExpiredAtom = atom(false);
export const sessionExpiredAtom = atom(
  (get) => get(isSessionExpiredAtom),
  (_get, set, newValue: boolean) => {
    set(isSessionExpiredAtom, newValue);
  }
);
