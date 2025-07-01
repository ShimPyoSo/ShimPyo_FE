'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import AuthCodeInput from './AuthCodeInput';
import { ISignUp } from '@/app/(_utils)/type';
import Image from 'next/image';
import arrow from '/public/images/icons/selectArrow.svg';
import { useState } from 'react';

interface EmailAuthInputProps {
  register: UseFormRegister<ISignUp>;
  watch: UseFormWatch<ISignUp>;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmailAuthInput({ register }: EmailAuthInputProps) {
  const [isAuthStart, setIsAuthStart] = useState(false);

  return (
    <>
      <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
        이메일 인증
        <div className="mt-[12px] flex justify-between items-center text-sm font-semibold text-[#242424]">
          <input
            className="w-[158px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black font-normal"
            placeholder="이메일을 입력하세요"
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '유효한 이메일 형식이 아닙니다.',
              },
            })}
          />
          @
          <div className="relative">
            <select className="w-[158px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black font-normal"></select>
            <Image
              className="absolute top-[16px] right-[16px] pointer-events-none"
              src={arrow}
              alt="더보기"
              width={24}
              height={24}
            />
          </div>
        </div>
      </label>
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
