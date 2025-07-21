'use client';

import { FieldValues, Path } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';

import AuthCodeInput from './AuthCodeInput';
import EmailAuthInput from './EmailAuthInput';
import axios from 'axios';
import { domainOptions } from '@/app/(_utils)/constants';
import { useTimer } from '@/app/(_utils)/hooks/useTimer';

interface EmailAuthInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  isVertified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'register' | 'find';
}

export default function EmailAuth<T extends ISignUp | IFind>({
  register,
  watch,
  isVertified,
  setIsVerified,
  type,
}: EmailAuthInputProps<T>) {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isAuthStart, setIsAuthStart] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  useTimer(timeLeft, setTimeLeft, isAuthStart);

  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domainOptions[0]);
  const email = watch('email' as Path<T>);

  useEffect(() => {
    setIsEmailError(false); // email 값 수정 시 emailError 해제
  }, [email, customDomain, selectedDomain]);

  const handleSendEmail = async () => {
    if (email === '' && selectedDomain.value === 'custom' && customDomain === '') {
      // id를 입력하지 않는 경우 return 코드 추가 예정
      return;
    }

    const fullEmail = `${email}@${selectedDomain.value === 'custom' ? customDomain : selectedDomain.value}`;

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/email`, { email: fullEmail, type: type });
      setIsAuthStart(true);
    } catch {
      setIsEmailError(true);
    }
  };

  return (
    <>
      <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">이메일 인증</label>
      <EmailAuthInput
        register={register}
        isEmailError={isEmailError}
        customDomain={customDomain}
        setCustomDomain={setCustomDomain}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
      />

      <button
        className={`mt-[16px] px-[15px] py-[10px] rounded-md border text-sm font-semibold tracking-[-2%] ${
          isAuthStart ? 'border-gn7 bg-gn8 text-gn1' : 'border-[#EDEDED] bg-w2 text-b2'
        }`}
        type="button"
        onClick={handleSendEmail}
      >
        인증하기
      </button>
      <p className="mt-[4px] text-xs text-b3">이메일 입력 후 인증을 진행해 주세요</p>

      <AuthCodeInput
        isAuthStart={isAuthStart}
        register={register}
        watch={watch}
        setIsVerified={setIsVerified}
        isVertified={isVertified}
        domain={selectedDomain.value === 'custom' ? customDomain : selectedDomain.value}
        timeLeft={timeLeft}
      />
    </>
  );
}
