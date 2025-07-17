'use client';

import { FieldValues, Path } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';
import { useEffect, useState } from 'react';

import DomainInput from './DomainInput';
import { IDomain } from '@/app/(_utils)/type';
import { UseFormRegister } from 'react-hook-form';

interface EmailAuthInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  isEmailError: boolean;
  customDomain: string;
  setCustomDomain: React.Dispatch<React.SetStateAction<string>>;
  selectedDomain: IDomain;
  setSelectedDomain: React.Dispatch<React.SetStateAction<IDomain>>;
}

export default function EmailAuthInput<T extends ISignUp | IFind>({
  register,
  isEmailError,
  customDomain,
  setCustomDomain,
  selectedDomain,
  setSelectedDomain,
}: EmailAuthInputProps<T>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // hydration error 방지용
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-[12px] flex justify-between items-center text-sm font-semibold text-[#242424]">
      <input
        className={`w-[158px] p-[16px] bg-w3 rounded-lg border text-base font-normal outline-none focus:border-gn1 text-black placeholder:text-g3 ${
          isEmailError ? 'border-r' : 'border-w4'
        }`}
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
      <DomainInput
        customDomain={customDomain}
        setCustomDomain={setCustomDomain}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
        isEmailError={isEmailError}
      />
    </div>
  );
}
