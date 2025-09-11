'use client';

import { ReactNode, useEffect } from 'react';
import { isHydratedAtom, isLoggedInAtom, isSocialAtom } from './(_store)/auth';
import { usePathname, useRouter } from 'next/navigation';

import { useAtomValue } from 'jotai';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isHydrated = useAtomValue(isHydratedAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isSocial = useAtomValue(isSocialAtom);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isLoggedIn) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isSocial && pathname === '/mypage/profile') {
      router.replace('/mypage');
      return;
    }

    if (!isSocial && (pathname === '/mypage/social/profile' || pathname === '/mypage/social/withdraw')) {
      router.replace('/mypage/profile');
      return;
    }
  }, [isHydrated, isLoggedIn, isSocial, pathname, router]);

  if (!isHydrated) return null;
  if (!isLoggedIn) return null;
  if (isSocial && pathname === '/mypage/profile') return null;
  if (!isSocial && (pathname === '/mypage/social/profile' || pathname === '/mypage/social/withdraw')) {
    return null;
  }

  return <>{children}</>;
}
