import CategoryComponent from '@/app/(_components)/category/CategoryComponent';
import ProtectedRoute from '@/app/ProtectedRoute';
import { Suspense } from 'react';

export default function LikedSpotList() {
  return (
    <Suspense>
      <ProtectedRoute>
        <CategoryComponent type="like" />
      </ProtectedRoute>
    </Suspense>
  );
}
