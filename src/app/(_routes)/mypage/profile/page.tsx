import ProfileMenu from '@/app/(_components)/mypage/profile/ProfileMenu';
import ProtectedRoute from '@/app/ProtectedRoute';

export default function Profile() {
  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <ProfileMenu />
      </div>
    </ProtectedRoute>
  );
}
