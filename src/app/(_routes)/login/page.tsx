import KakaoButton from '@/app/(_components)/user/KakaoButton';
import Link from 'next/link';
import LoginForm from '@/app/(_components)/user/login/LoginForm';

export default function Login() {
  return (
    <div className="h-full bg-w1 px-[16px] pt-[30px]">
      <LoginForm />
      <div className="flex items-center mt-[85px] mb-[16px]">
        <div className="flex-grow border-t border-g3"></div>
        <p className="mx-[10px] text-xs text-g3 whitespace-nowrap">간편 로그인</p>
        <div className="flex-grow border-t border-g3"></div>
      </div>
      <KakaoButton />
      <p className="mt-[80px] text-center text-xs text-g1 tracking-[-2%]">
        아직 회원이 아니신가요?{' '}
        <Link className="text-b1 underline" href={'/signup'}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
