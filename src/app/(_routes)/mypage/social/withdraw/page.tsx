'use client';

import Alert from '@/app/(_components)/UI/Alert';
import ProtectedRoute from '@/app/ProtectedRoute';
import SocailWithdrawForm from '@/app/(_components)/mypage/profile/SocialWithdrawForm';
import { logoutAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SocialWithdraw() {
  const [isWithdrawAlert, setIsWithdrawAlert] = useState(false);
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
      <div className="min-h-full bg-w1 px-[16px]">
        <p className="mt-[30px] font-semibold text-b1 tracking-[-0.013em]">아래의 약관을 꼼꼼히 확인해 주세요</p>
        <SocailWithdrawForm setIsWithdrawAlert={setIsWithdrawAlert} />
      </div>
      {isWithdrawAlert && (
        <Alert
          title={'회원 탈퇴 완료'}
          description={'회원 탈퇴가 완료되었어요\n그동안 쉼표를 이용해 주셔서 감사합니다🙏'}
          confirmText={'확인'}
          setIsOpen={setIsWithdrawAlert}
          onConfirm={handleWithdrawLogout}
        />
      )}
    </ProtectedRoute>
  );
}
