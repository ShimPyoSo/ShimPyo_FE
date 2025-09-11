'use client';

import Image from 'next/image';
import KakaoButton from '../KakaoButton';
import Link from 'next/link';
import LoginForm from './LoginForm';
import logo from '/public/images/loginLogo.svg';
import { setTitleAtom } from '@/app/(_store)/title';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function LoginComponent() {
  const [, setTitle] = useAtom(setTitleAtom);

  useEffect(() => {
    setTitle('로그인');
  }, [setTitle]);

  return (
    <div
      className="bg-w1 px-[16px] pt-[30px] flex flex-col justify-center items-center"
      style={{ minHeight: 'calc(100vh - 156px)' }}
    >
      <Link href={'/'} className="mb-[24px] lg:mb-[40px]">
        <Image src={logo} alt="로고" width={170} height={52} />
      </Link>
      <LoginForm />
      <div className="w-full flex items-center mt-[40px] lg:mt-[85px] mb-[16px]">
        <div className="flex-grow border-t border-g3"></div>
        <p className="mx-[10px] text-xs text-g3 whitespace-nowrap">간편 로그인</p>
        <div className="flex-grow border-t border-g3"></div>
      </div>
      <KakaoButton type="login" />
      <p className="mt-[20px] lg:mt-[80px] text-center text-xs text-g1 tracking-[-0.02em]">
        아직 회원이 아니신가요?{' '}
        <Link className="text-b1 underline" href={'/signup'}>
          회원가입
        </Link>
      </p>
    </div>
  );
}
