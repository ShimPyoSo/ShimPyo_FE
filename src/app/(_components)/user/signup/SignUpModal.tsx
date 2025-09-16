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
          description={'입력하신 이메일 주소로 인증 번호를 전송했어요✉️\n지금 메일함을 확인해 보세요'}
          confirmText="확인"
          setIsOpen={setIsEmailOpen}
          onConfirm={() => {}}
        />
      )}
    </>
  );
}
