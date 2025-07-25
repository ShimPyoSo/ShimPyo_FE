'use client';

import { useForm, useFormState } from 'react-hook-form';

import EmailAuth from '../EmailAuth';
import { ISignUp } from '@/app/(_utils)/type';
import IdInput from '../IdInput';
import Link from 'next/link';
import PasswordInput from './PasswordInput';
import axios from 'axios';
import { domainOptions } from '@/app/(_utils)/constants';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpForm() {
  const { register, handleSubmit, watch, control } = useForm<ISignUp>({ mode: 'onBlur' });
  const router = useRouter();

  const { errors } = useFormState({ control });
  const [isVerified, setIsVerified] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domainOptions[0]);

  const onSubmit = async (data: ISignUp) => {
    if (!isVerified) {
      // 인증 완료하지 않은 회원 return 코드 추가 예정
      return;
    }

    try {
      const fullEmail = `${data.email}@${selectedDomain.value === 'custom' ? customDomain : selectedDomain.value}`;

      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/signup`, {
        email: fullEmail,
        username: data.username,
        password: data.password,
      });
      router.push('/');
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IdInput
        register={register}
        type="signup"
        watch={watch}
        isIdChecked={isIdChecked}
        setIsIdChecked={setIsIdChecked}
      />
      <PasswordInput register={register} watch={watch} errors={errors} />
      <EmailAuth
        register={register}
        setIsVerified={setIsVerified}
        watch={watch}
        isVertified={isVerified}
        type="register"
        customDomain={customDomain}
        setCustomDomain={setCustomDomain}
        selectedDomain={selectedDomain}
        setSelectedDomain={setSelectedDomain}
      />

      <div className="sticky bottom-0 bg-w1 py-[30px] flex flex-col items-center">
        <button
          className={`w-full py-[16px] rounded-lg border font-semibold ${
            isIdChecked && isVerified ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
          } `}
        >
          가입하기
        </button>
        <p className="mt-[30px] text-xs text-g1 tracking-[-2%]">
          이미 계정이 있으신가요?{' '}
          <Link className="text-b1 underline" href={'/login'}>
            로그인
          </Link>
        </p>
      </div>
    </form>
  );
}
