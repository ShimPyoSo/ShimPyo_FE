'use client';

import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { ISignUp } from '@/app/(_utils)/type';
import PasswordCheck from '../PasswordCheck';
import { useState } from 'react';

interface PasswordInputProps {
  register: UseFormRegister<ISignUp>;
  watch: UseFormWatch<ISignUp>;
  errors: FieldErrors<ISignUp>;
}

export default function PasswordInput({ register, watch, errors }: PasswordInputProps) {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordConfirmOpen, setPasswordConfirmOpen] = useState(false);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] = useState(false);

  const password = watch('password');

  return (
    <>
      <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
        비밀번호
        <small className={`text-xs text-g1 mb-[12px] ${errors.password ? 'text-r' : 'text-g2'}`}>
          {errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
            ? '비밀번호를 양식에 맞춰 설정해 주세요'
            : '8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요'}
        </small>
        <div className="relative">
          <input
            className={`w-full p-[16px] bg-w3 rounded-lg border text-base outline-none focus:border-gn1 text-black placeholder:text-g3 ${
              errors.password ? 'border-red-500' : 'border-w4'
            }`}
            type={passwordOpen ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
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
          <PasswordCheck
            isFocused={isPasswordFocused}
            isOpen={passwordOpen}
            setIsOpen={setPasswordOpen}
            marginTop={16}
          />
        </div>
      </label>

      <label className="mt-[40px] mb-[12px]  flex flex-col text-sm text-b3 tracking-[-2%]">
        비밀번호 확인
        <small className={`text-xs text-g1 mb-[12px] ${errors.passwordConfirm ? 'text-r' : 'text-g2'}`}>
          {errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.'
            ? '비밀번호가 일치하지 않아요'
            : '비밀번호를 한 번 더 입력해 주세요'}
        </small>
        <div className="relative">
          <input
            className={`w-full p-[16px] bg-w3 rounded-lg border text-base outline-none focus:border-gn1 text-black placeholder:text-g3 ${
              errors.passwordConfirm ? 'border-r' : 'border-w4'
            }`}
            type={passwordConfirmOpen ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            {...register('passwordConfirm', {
              required: '비밀번호 확인은 필수입니다.',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
            })}
            onFocus={() => setIsPasswordConfirmFocused(true)}
            onBlur={() => setIsPasswordConfirmFocused(false)}
          />
          <PasswordCheck
            isFocused={isPasswordConfirmFocused}
            isOpen={passwordConfirmOpen}
            setIsOpen={setPasswordConfirmOpen}
            marginTop={16}
          />
        </div>
      </label>
    </>
  );
}
