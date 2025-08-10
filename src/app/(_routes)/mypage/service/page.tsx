import ProtectedRoute from '@/app/ProtectedRoute';
import ServiceMenu from '@/app/(_components)/mypage/service/ServiceMenu';

export default function Service() {
  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <ServiceMenu />
      </div>
    </ProtectedRoute>
  );
}
