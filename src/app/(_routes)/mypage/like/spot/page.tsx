import CategoryComponent from '@/app/(_components)/category/CategoryComponent';
import { Suspense } from 'react';

export default function LikedSpotList() {
  return (
    <Suspense>
      <CategoryComponent />
    </Suspense>
  );
}
