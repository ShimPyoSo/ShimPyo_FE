import CategoryComponent from '@/app/(_components)/category/CategoryComponent';
import { Suspense } from 'react';

export default function Category() {
  return (
    <Suspense>
      <CategoryComponent type="list" />
    </Suspense>
  );
}
