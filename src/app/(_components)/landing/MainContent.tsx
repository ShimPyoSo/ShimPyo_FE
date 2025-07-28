'use client';

import LikedSpot from './LikedSpot';
import Recommend from './Recommend';
import dynamic from 'next/dynamic';
import { isLoggedInAtom } from '@/app/(_store)/auth';
import { useAtomValue } from 'jotai';

const TodayWellness = dynamic(() => import('./wellness/TodayWellness'));

export default function MainContent() {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <>
      <Recommend />
      {isLoggedIn && <LikedSpot />}
      <TodayWellness />
    </>
  );
}
