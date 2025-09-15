'use client';

import { Suspense, useState } from 'react';

import Alert from '@/app/(_components)/UI/Alert';
import ProfileMenu from '@/app/(_components)/mypage/profile/ProfileMenu';
import ProtectedRoute from '@/app/ProtectedRoute';
import { logoutAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useLogout } from '@/app/(_utils)/hooks/useLogout';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [isPasswordAlert, setIsPasswordAlert] = useState(false);
  const [isNicknameAlert, setIsNicknameAlert] = useState(false);
  const [isWithdrawAlert, setIsWithdrawAlert] = useState(false);
  const { handleLogout } = useLogout();
  const router = useRouter();
  const [, logout] = useAtom(logoutAtom);

  const handleWithdrawLogout = () => {
    try {
      logout();
      localStorage.removeItem('isRememberMe');
      router.push('/');
    } catch {
      // 로그아웃 실패 시 error 처리 추후 구현
    }
  };

  return (
    <ProtectedRoute>
      <Suspense>
        <div className="min-h-full bg-w1 px-[16px]">
          <ProfileMenu
            setIsPasswordAlert={setIsPasswordAlert}
            setIsWithdrawAlert={setIsWithdrawAlert}
            setIsNicknameAlert={setIsNicknameAlert}
          />
        </div>
      </Suspense>

      {isNicknameAlert && (
        <Alert
          title={'닉네임 변경 완료'}
          description={'닉네임 변경이 완료되었습니다.\n변경된 닉네임이 즉시 적용됩니다.'}
          confirmText={'확인'}
          setIsOpen={setIsNicknameAlert}
          onConfirm={() => router.push('/mypage')}
        />
      )}
      {isPasswordAlert && (
        <Alert
          title={'비밀번호 변경 완료'}
          description={'비밀번호가 변경되었습니다.\n보안을 위해 다시 로그인해주세요.'}
          confirmText={'확인'}
          setIsOpen={setIsPasswordAlert}
          onConfirm={handleLogout}
        />
      )}
      {isWithdrawAlert && (
        <Alert
          title={'회원 탈퇴 완료'}
          description={'회원 탈퇴가 완료되었습니다.\n서비스를 이용해주셔서 감사합니다.'}
          confirmText={'확인'}
          setIsOpen={setIsWithdrawAlert}
          onConfirm={handleWithdrawLogout}
        />
      )}
    </ProtectedRoute>
  );
}
