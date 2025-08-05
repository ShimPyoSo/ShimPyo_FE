'use client';

import { Control, UseFormRegister, UseFormTrigger, UseFormWatch, useFormState } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { IPasswordChange } from '@/app/(_utils)/type';
import PasswordCheck from '../../user/PasswordCheck';

interface PasswordInputProps {
  register: UseFormRegister<IPasswordChange>;
  watch: UseFormWatch<IPasswordChange>;
  control: Control<IPasswordChange>;
  trigger: UseFormTrigger<IPasswordChange>;
  isPasswordError: boolean;
}

export default function PasswordInput({ register, watch, trigger, control, isPasswordError }: PasswordInputProps) {
  const { errors } = useFormState({ control });
  const [nowPasswordOpen, setNowPasswordOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordConfirmOpen, setPasswordConfirmOpen] = useState(false);

  const [isNowPasswordFocused, setIsNowPasswordFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] = useState(false);

  const nowPassword = watch('nowPassword');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  useEffect(() => {
    const validatePasswordConfirm = async () => {
      if (password && passwordConfirm && !isPasswordConfirmFocused) {
        await trigger('passwordConfirm');
      }
    };

    const validatePassword = async () => {
      if (nowPassword && password && !isPasswordFocused) {
        await trigger('password');
      }
    };

    validatePasswordConfirm();
    validatePassword();
  }, [password, passwordConfirm, nowPassword, isPasswordConfirmFocused, isPasswordFocused, trigger]);

  return (
    <div className="mt-[12px] flex flex-col gap-[12px]">
      <div className="relative">
        <input
          className={`w-full bg-white border px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none placeholder:text-g3 ${
            isPasswordError || errors.nowPassword ? 'border-r' : 'border-w4'
          }`}
          type={nowPasswordOpen ? 'text' : 'password'}
          placeholder="현재 비밀번호를 입력해 주세요"
          {...register('nowPassword', {
            required: '현재 비밀번호는 필수 입력입니다.',
          })}
          onFocus={() => setIsNowPasswordFocused(true)}
          onBlur={() => {
            setIsNowPasswordFocused(false);
            trigger('nowPassword');
          }}
        />
        <PasswordCheck
          isFocused={isNowPasswordFocused}
          isOpen={nowPasswordOpen}
          setIsOpen={setNowPasswordOpen}
          marginTop={10}
        />
      </div>

      <div className="relative">
        <input
          className={`w-full bg-white border px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none placeholder:text-g3 ${
            errors.password ? 'border-r' : 'border-w4'
          }`}
          type={passwordOpen ? 'text' : 'password'}
          placeholder="새로운 비밀번호를 입력해 주세요"
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,}$/,
              message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
            },
            validate: (value) => value !== nowPassword || '기존 비밀번호로 변경할 수 없습니다.',
          })}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => {
            setIsPasswordFocused(false);
            trigger('password');
          }}
        />
        <PasswordCheck isFocused={isPasswordFocused} isOpen={passwordOpen} setIsOpen={setPasswordOpen} marginTop={10} />
      </div>

      <div className="relative">
        <input
          className={`w-full bg-white border px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none placeholder:text-g3 ${
            errors.passwordConfirm ? 'border-r' : 'border-w4'
          }`}
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
          marginTop={10}
        />
      </div>
    </div>
  );
}
