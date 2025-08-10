import CategoryComponent from '@/app/(_components)/category/CategoryComponent';
import ProtectedRoute from '@/app/ProtectedRoute';

export default function LikedSpotList() {
  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1">
        <CategoryComponent />
      </div>
    </ProtectedRoute>
  );
}
