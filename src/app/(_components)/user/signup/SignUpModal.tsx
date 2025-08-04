import Alert from '../../UI/Alert';

interface SignUpModalProps {
  isEmailOpen: boolean;
  setIsEmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpModal({ isEmailOpen, setIsEmailOpen }: SignUpModalProps) {
  return (
    <>
      {isEmailOpen && (
        <Alert
          title="이메일 인증"
          description={'✉️ 인증 메일이 전송되었습니다.\n이메일을 확인해 주세요.'}
          confirmText="확인"
          setIsOpen={setIsEmailOpen}
          onConfirm={() => {}}
        />
      )}
    </>
  );
}
