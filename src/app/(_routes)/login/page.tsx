import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '@/app/(_components)/login/LoginForm';
import kakao from '/public/images/icons/kakao.svg';

export default function Login() {
  return (
    <div className="h-full bg-w1 px-[16px] pt-[30px]">
      <LoginForm />
      <div className="flex items-center mt-[85px]">
        <div className="flex-grow border-t border-g3"></div>
        <p className="mx-[10px] text-xs text-g3 whitespace-nowrap">간편 로그인</p>
        <div className="flex-grow border-t border-g3"></div>
      </div>
      <button className="mt-[16px] flex gap-[8px] justify-center items-center w-full rounded-lg py-[16px] bg-y text-b1 font-semibold tracking-[-1.3%]">
        <Image src={kakao} alt="카카오" width={20} height={20} />
        카카오로 회원가입
      </button>
      <p className="mt-[80px] text-center text-xs text-g1 tracking-[-2%]">
        아직 회원이 아니신가요?{' '}
        <Link className="text-b1 underline" href={'/signup'}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
