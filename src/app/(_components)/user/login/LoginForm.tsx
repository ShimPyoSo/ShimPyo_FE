'use client';

import { ILogin, IMember } from '@/app/(_utils)/type';

import Link from 'next/link';
import LoginInput from './LoginInput';
import RememberMeInput from './RememberMeInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const { register, handleSubmit } = useForm<ILogin>();

  const onSubmit = async (data: ILogin) => {
    try {
      const response = await axios.post<IMember>('/login', data);
      console.log(response); // 전역 상태 관리 구현 후 수정
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <form className="mt-[145px]" onSubmit={handleSubmit(onSubmit)}>
      <LoginInput register={register} />
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
