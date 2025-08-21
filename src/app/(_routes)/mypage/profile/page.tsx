'use client';

import Alert from '@/app/(_components)/UI/Alert';
import ProfileMenu from '@/app/(_components)/mypage/profile/ProfileMenu';
import ProtectedRoute from '@/app/ProtectedRoute';
import { useLogout } from '@/app/(_utils)/hooks/useLogout';
import { useState } from 'react';

export default function Profile() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { handleLogout } = useLogout();

  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px]">
        <ProfileMenu setIsAlertOpen={setIsAlertOpen} />
      </div>
      {isAlertOpen && (
        <Alert
          title={'비밀번호 변경 완료'}
          description={'비밀번호가 변경되었습니다.\n보안을 위해 다시 로그인해주세요.'}
          confirmText={'확인'}
          setIsOpen={setIsAlertOpen}
          onConfirm={handleLogout}
        />
      )}
    </ProtectedRoute>
  );
}
