'use client';

import { FieldValues, Path } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

import AuthCodeInput from './AuthCodeInput';
import DomainInput from './DomainInput';

interface EmailAuthInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmailAuthInput<T extends ISignUp | IFind>({ register }: EmailAuthInputProps<T>) {
  const [isAuthStart, setIsAuthStart] = useState(false);
  const [customDomain, setCustomDomain] = useState('');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // hydration error 방지용
  }, []);

  if (!mounted) return null;

  return (
    <>
      <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">이메일 인증</label>
      <div className="mt-[12px] flex justify-between items-center text-sm font-semibold text-[#242424]">
        <input
          className="w-[158px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black font-normal"
          placeholder="이메일 입력"
          {...register('email' as Path<T>, {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '유효한 이메일 형식이 아닙니다.',
            },
          })}
        />
        @
        <DomainInput customDomain={customDomain} setCustomDomain={setCustomDomain} />
      </div>

      <button
        className={`mt-[16px] px-[15px] py-[10px] rounded-md border text-sm font-semibold tracking-[-2%] ${
          isAuthStart ? 'border-gn7 bg-gn8 text-gn1' : 'border-[#EDEDED] bg-w2 text-b2'
        }`}
        type="button"
        onClick={() => setIsAuthStart(true)}
      >
        인증하기
      </button>
      <p className="mt-[6px] text-xs text-b3">이메일 입력 후 인증을 진행해 주세요</p>

      <AuthCodeInput isAuthStart={isAuthStart} register={register} />
    </>
  );
}
