'use client';

import { ILogin } from '@/app/(_utils)/type';
import PasswordCheck from '../PasswordCheck';
import { UseFormRegister } from 'react-hook-form';
import { useState } from 'react';

interface LoginInputProps {
  register: UseFormRegister<ILogin>;
}

export default function LoginInput({ register }: LoginInputProps) {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <>
      <input
        className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 outline-none focus:border-gn1 text-black"
        placeholder="아이디를 입력해 주세요"
        {...register('username', { required: true })}
      />
      <div className="relative">
        <input
          className="w-full mt-[8px] p-[16px] bg-w3 rounded-lg border border-w4 outline-none focus:border-gn1 text-black"
          type={passwordOpen ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          {...register('password', { required: true })}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <PasswordCheck isFocused={isPasswordFocused} isOpen={passwordOpen} setIsOpen={setPasswordOpen} />
      </div>
    </>
  );
}
