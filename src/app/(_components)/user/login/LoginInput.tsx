'use client';

import { ILogin } from '@/app/(_utils)/type';
import PasswordCheck from '../PasswordCheck';
import { UseFormRegister } from 'react-hook-form';
import { useState } from 'react';

interface LoginInputProps {
  register: UseFormRegister<ILogin>;
  isLoginFailed: boolean;
}

export default function LoginInput({ register, isLoginFailed }: LoginInputProps) {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <>
      <input
        className={`w-full mt-[12px] mb-[8px] p-[16px] bg-w3 rounded-lg border outline-none focus:border-gn1 text-black ${
          isLoginFailed ? 'border-r' : 'border-w4'
        }`}
        placeholder="아이디를 입력해 주세요"
        {...register('username', { required: true })}
      />
      <div className="relative">
        <input
          className={`w-full p-[16px] bg-w3 rounded-lg border outline-none focus:border-gn1 text-black ${
            isLoginFailed ? 'border-r' : 'border-w4'
          }`}
          type={passwordOpen ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          {...register('password', { required: true })}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <PasswordCheck isFocused={isPasswordFocused} isOpen={passwordOpen} setIsOpen={setPasswordOpen} marginTop={16} />
      </div>
    </>
  );
}
