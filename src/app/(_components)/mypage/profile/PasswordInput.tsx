'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { IPasswordChange } from '@/app/(_utils)/type';
import PasswordCheck from '../../user/PasswordCheck';
import { useState } from 'react';

interface PasswordInputProps {
  register: UseFormRegister<IPasswordChange>;
  watch: UseFormWatch<IPasswordChange>;
}

export default function PasswordInput({ register, watch }: PasswordInputProps) {
  const password = watch('password');
  const [nowPasswordOpen, setNowPasswordOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordConfirmOpen, setPasswordConfirmOpen] = useState(false);

  const [isNowPasswordFocused, setIsNowPasswordFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] = useState(false);

  return (
    <div className="mt-[12px] flex flex-col gap-[12px]">
      <div className="relative">
        <input
          className="w-full bg-white border border-w4 px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none"
          type={nowPasswordOpen ? 'text' : 'password'}
          placeholder="현재 비밀번호를 입력해 주세요"
          {...register('nowPassword', {
            required: '현재 비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,}$/,
              message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
            },
          })}
          onFocus={() => setIsNowPasswordFocused(true)}
          onBlur={() => setIsNowPasswordFocused(false)}
        />
        <PasswordCheck
          isFocused={isNowPasswordFocused}
          isOpen={nowPasswordOpen}
          setIsOpen={setNowPasswordOpen}
          marginTop={12}
        />
      </div>

      <div className="relative">
        <input
          className="w-full bg-white border border-w4 px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none"
          type={passwordOpen ? 'text' : 'password'}
          placeholder="새로운 비밀번호를 입력해 주세요"
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,}$/,
              message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
            },
          })}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <PasswordCheck isFocused={isPasswordFocused} isOpen={passwordOpen} setIsOpen={setPasswordOpen} marginTop={12} />
      </div>

      <div className="relative">
        <input
          className="w-full bg-white border border-w4 px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none"
          type={passwordConfirmOpen ? 'text' : 'password'}
          placeholder="새로운 비밀번호를 다시 입력해 주세요"
          {...register('passwordConfirm', {
            required: '비밀번호 확인은 필수 입력입니다.',
            validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
          })}
          onFocus={() => setIsPasswordConfirmFocused(true)}
          onBlur={() => setIsPasswordConfirmFocused(false)}
        />
        <PasswordCheck
          isFocused={isPasswordConfirmFocused}
          isOpen={passwordConfirmOpen}
          setIsOpen={setPasswordConfirmOpen}
          marginTop={12}
        />
      </div>
    </div>
  );
}
