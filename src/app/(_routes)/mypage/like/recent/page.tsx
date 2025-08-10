import ProtectedRoute from '@/app/ProtectedRoute';
import RecentSpot from '@/app/(_components)/mypage/like/RecentSpot';

export default function Recent() {
  return (
    <ProtectedRoute>
      <div className="bg-w1 h-full px-[16px] pb-[40px]">
        <RecentSpot />
      </div>
    </ProtectedRoute>
  );
}
