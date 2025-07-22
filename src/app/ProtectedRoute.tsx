'use client';

import { ReactNode, useEffect } from 'react';
import { isHydratedAtom, isLoggedInAtom } from './(_store)/auth';
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

  useEffect(() => {
    if (isHydrated && !isLoggedIn) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isHydrated, isLoggedIn, pathname, router]);

  if (!isHydrated) return null;
  if (!isLoggedIn) return null;

  return <>{children}</>;
}
