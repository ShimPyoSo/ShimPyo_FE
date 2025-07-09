'use client';

import { ILogin, IMember } from '@/app/(_utils)/type';

import Link from 'next/link';
import LoginInput from './LoginInput';
import RememberMeInput from './RememberMeInput';
import axios from 'axios';
import { loginAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<ILogin>();
  const [, login] = useAtom(loginAtom);
  const router = useRouter();
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const onSubmit = async (data: ILogin) => {
    try {
      const response = await axios.post<IMember>('/login', data);
      login(response.data);
      if (data.isRememberMe) localStorage.setItem('isRememberMe', 'true');
      router.push('/');
    } catch {
      setIsLoginFailed(true);
    }
  };

  return (
    <form className="mt-[145px]" onSubmit={handleSubmit(onSubmit)}>
      <LoginInput register={register} isLoginFailed={isLoginFailed} />
      {isLoginFailed && <p className="text-xs text-r">아이디 또는 비밀번호를 다시 입력해 주세요</p>}
      <div className="mt-[16px] flex justify-between items-center text-xs text-g1">
        <RememberMeInput register={register} />
        <div className="flex gap-[6px]">
          <Link href={'/find/id'}>아이디 찾기</Link>
          <span className="text-w4">|</span>
          <Link href={'/find/password'}>비밀번호 찾기</Link>
        </div>
      </div>

      <button className="w-full mt-[30px] py-[16px] bg-gn1 rounded-lg border border-gn5 text-white font-semibold cursor-pointer">
        로그인 하기
      </button>
    </form>
  );
}
