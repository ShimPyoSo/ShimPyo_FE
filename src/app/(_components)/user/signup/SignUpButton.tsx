import Link from 'next/link';

interface SignUpButtonProps {
  isVerified: boolean;
  isIdChecked: boolean;
}

export default function SignUpButton({ isVerified, isIdChecked }: SignUpButtonProps) {
  return (
    <div className="mt-[30px] py-[20px] w-full bg-w1 flex flex-col items-center">
      <button
        type="submit"
        className={`w-full py-[16px] rounded-lg border font-semibold ${
          isIdChecked && isVerified ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
        } `}
      >
        가입하기
      </button>
      <p className="mt-[30px] text-xs text-g1 tracking-[-0.02em]">
        이미 계정이 있으신가요?{' '}
        <Link className="text-b1 underline" href={'/login'}>
          로그인
        </Link>
      </p>
    </div>
  );
}
