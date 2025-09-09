'use client';

import { isLoggedInAtom, loginAtom } from '@/app/(_store)/auth';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import EmailAuth from '../EmailAuth';
import { ISignUp } from '@/app/(_utils)/type';
import IdInput from '../IdInput';
import Loader from '../../UI/Loader';
import PasswordInput from './PasswordInput';
import SignUpButton from './SignUpButton';
import SignUpModal from './SignUpModal';
import axios from 'axios';
import { domainOptions } from '@/app/(_utils)/constants';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const { register, handleSubmit, watch, trigger, control } = useForm<ISignUp>({ mode: 'onBlur' });
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domainOptions[0]);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, login] = useAtom(loginAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/signup/additional');
    }
  }, [isLoggedIn, router]);

  const onSubmit = async (data: ISignUp) => {
    if (!isVerified) {
      return;
    }

    try {
      const fullEmail = `${data.email}@${selectedDomain.value === 'custom' ? customDomain : selectedDomain.value}`;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/signup`,
        {
          email: fullEmail,
          username: data.username,
          password: data.password,
        },
        { withCredentials: true }
      );
      login({
        user: response.data,
        loginType: 'email',
      });
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <>
      <form className="h-full relative" onSubmit={handleSubmit(onSubmit)}>
        <IdInput
          register={register}
          type="signup"
          watch={watch}
          control={control}
          isIdChecked={isIdChecked}
          setIsIdChecked={setIsIdChecked}
        />
        <PasswordInput register={register} watch={watch} control={control} trigger={trigger} />
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
          setIsOpen={setIsEmailOpen}
          setIsLoading={setIsLoading}
        />

        <SignUpButton isIdChecked={isIdChecked} isVerified={isVerified} />
      </form>
      <SignUpModal isEmailOpen={isEmailOpen} setIsEmailOpen={setIsEmailOpen} />
      {isLoading && <Loader />}
    </>
  );
}
