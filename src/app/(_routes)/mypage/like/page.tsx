import LikeMenu from '@/app/(_components)/mypage/like/LikeMenu';
import ProtectedRoute from '@/app/ProtectedRoute';

export default function Like() {
  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <LikeMenu />
      </div>
    </ProtectedRoute>
  );
}
