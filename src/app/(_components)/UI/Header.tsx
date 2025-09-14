'use client';

import { notRendering, title } from '@/app/(_utils)/constants';
import { useEffect, useState } from 'react';

import HeaderButton from './HeaderButton';
import { headerTitleAtom } from '@/app/(_store)/title';
import { useAtomValue } from 'jotai';
import { useFullPath } from '@/app/(_utils)/hooks/useFullPath';

export default function Header() {
  const fullPath = useFullPath();

  const headerTitle = useAtomValue(headerTitleAtom);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  if (notRendering.includes(fullPath)) return null;

  return (
    <header className="w-full h-[56px] sticky top-0 bg-w1 flex justify-center items-center relative">
      <h1 className="font-semibold">{title[fullPath] || headerTitle}</h1>
      <HeaderButton />
    </header>
  );
}
