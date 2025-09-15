'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useFullPath() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [fullPath, setFullPath] = useState(pathname);

  useEffect(() => {
    const queryString = searchParams.toString();
    setFullPath(queryString ? `${pathname}?${queryString}` : pathname);
  }, [pathname, searchParams]);

  return fullPath;
}
