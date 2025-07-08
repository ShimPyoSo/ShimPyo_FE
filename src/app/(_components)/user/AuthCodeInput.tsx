'use client';

import { FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';

import axios from 'axios';
import getRemainTime from '@/app/(_utils)/getRemainTime';
import { useState } from 'react';

interface AuthCodeInputProps<T extends FieldValues> {
  isAuthStart: boolean;
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  isVertified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  domain: string;
  timeLeft: number;
}

export default function AuthCodeInput<T extends ISignUp | IFind>({
  isAuthStart,
  register,
  watch,
  isVertified,
  setIsVerified,
  domain,
  timeLeft,
}: AuthCodeInputProps<T>) {
  const [codeState, setCodeState] = useState<'prev' | 'finished' | 'failed'>('prev');
  const authCode = watch('authCode' as Path<T>);
  const email = watch('email' as Path<T>);

  const handleAuthCodeCheck = async () => {
    if (authCode === '') {
      // code를 입력하지 않는 경우 return 코드 추가 예정
      return;
    }

    try {
      await axios.post('/email/validation', { email: `${email}@${domain}`, code: authCode });
      setCodeState('finished');
      setIsVerified(true);
    } catch {
      setCodeState('failed');
    }
  };

  return (
    <>
      {isAuthStart && (
        <>
          <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
            인증 코드
            <input
              className={`w-full p-[16px] bg-w3 rounded-lg border text-base outline-none focus:border-gn1 text-black ${
                codeState === 'failed' ? 'border-r' : 'border-w4'
              }`}
              placeholder="인증코드를 입력해 주세요"
              {...(register('authCode' as Path<T>), { required: true })}
            />
          </label>
          <button
            className="mt-[16px] px-[15px] py-[10px] rounded-md border border-[#EDEDED] bg-w2 text-sm text-b2 font-semibold tracking-[-2%]"
            onClick={handleAuthCodeCheck}
          >
            확인하기
          </button>
          {isAuthStart && !isVertified && (
            <p className="mt-[6px] font-semibold text-r text-xs">{getRemainTime(timeLeft)}</p>
          )}
          <p className={`mt-[6px] text-xs ${codeState === 'failed' ? 'text-r' : 'text-b3'}`}>
            {codeState === 'prev'
              ? '인증 코드를 입력한 후 확인하기를 눌러주세요'
              : codeState === 'finished'
              ? '인증이 완료되었어요'
              : '인증 번호를 다시 확인해 주세요'}
          </p>
        </>
      )}
    </>
  );
}
