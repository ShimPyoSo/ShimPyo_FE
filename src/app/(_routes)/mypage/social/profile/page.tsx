'use client';

import Alert from '@/app/(_components)/UI/Alert';
import NicknameChange from '@/app/(_components)/mypage/profile/NicknameChange';
import ProtectedRoute from '@/app/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SocialProfile() {
  const [isNicknameAlert, setIsNicknameAlert] = useState(false);
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="min-h-full bg-w1 px-[16px] pt-[24px]">
        <NicknameChange setIsNicknameAlert={setIsNicknameAlert} />
      </div>
      {isNicknameAlert && (
        <Alert
          title={'닉네임 변경 완료'}
          description={'닉네임 변경이 완료되었습니다.\n변경된 닉네임이 즉시 적용됩니다.'}
          confirmText={'확인'}
          setIsOpen={setIsNicknameAlert}
          onConfirm={() => router.push('/mypage')}
        />
      )}
    </ProtectedRoute>
  );
}
