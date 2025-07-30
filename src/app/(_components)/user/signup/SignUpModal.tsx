'use client';

import Alert from '../../UI/Alert';
import { useRouter } from 'next/navigation';

interface SignUpModalProps {
  isFinishOpen: boolean;
  setIsFinishOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEmailOpen: boolean;
  setIsEmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpModal({ isFinishOpen, setIsFinishOpen, isEmailOpen, setIsEmailOpen }: SignUpModalProps) {
  const router = useRouter();

  return (
    <>
      {isFinishOpen && (
        <Alert
          title="회원가입"
          description="🎉 회원가입이 완료되었습니다!\n지금 바로 로그인해보세요."
          confirmText="확인"
          setIsOpen={setIsFinishOpen}
          onConfirm={() => router.push('/')}
        />
      )}
      {isEmailOpen && (
        <Alert
          title="이메일 인증"
          description="✉️ 인증 메일이 전송되었습니다.\n이메일을 확인해 주세요."
          confirmText="확인"
          setIsOpen={setIsEmailOpen}
          onConfirm={() => {}}
        />
      )}
    </>
  );
}
