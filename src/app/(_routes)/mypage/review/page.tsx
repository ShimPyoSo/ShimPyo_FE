import ProtectedRoute from '@/app/ProtectedRoute';
import ReviewSpotList from '@/app/(_components)/mypage/review/ReviewSpotList';

export default function Review() {
  return (
    <ProtectedRoute>
      <div className="h-full bg-w1 px-[16px] py-[30px]">
        <ReviewSpotList />
      </div>
    </ProtectedRoute>
  );
}
