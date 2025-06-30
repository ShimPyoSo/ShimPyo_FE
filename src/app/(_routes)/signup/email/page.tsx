import Link from 'next/link';
import SignUpForm from '@/app/(_components)/signup/SignUpForm';

export default function EmailSignUp() {
  return (
    <div className="bg-w1 flex flex-col justify-between px-[16px] pt-[30px]">
      <form>
        <SignUpForm />

        <div className="sticky bottom-0 bg-w1 py-[30px] flex flex-col items-center">
          <button className="w-full py-[16px] bg-gn1 rounded-lg border border-gn5 text-white font-semibold cursor-pointer">
            가입하기
          </button>
          <p className="mt-[30px] text-xs text-g1 tracking-[-2%]">
            이미 계정이 있으신가요?{' '}
            <Link className="text-b1 underline" href={'/login'}>
              로그인
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
