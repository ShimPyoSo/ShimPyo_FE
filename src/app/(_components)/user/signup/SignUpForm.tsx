'use client';

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
import { useState } from 'react';

export default function SignUpForm() {
  const { register, handleSubmit, watch, control } = useForm<ISignUp>({ mode: 'onChange' });

  const [isVerified, setIsVerified] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domainOptions[0]);
  const [isFinishOpen, setIsFinishOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ISignUp) => {
    if (!isVerified) {
      return;
    }

    try {
      const fullEmail = `${data.email}@${selectedDomain.value === 'custom' ? customDomain : selectedDomain.value}`;

      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/signup`, {
        email: fullEmail,
        username: data.username,
        password: data.password,
      });
      setIsFinishOpen(true);
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IdInput
          register={register}
          type="signup"
          watch={watch}
          control={control}
          isIdChecked={isIdChecked}
          setIsIdChecked={setIsIdChecked}
        />
        <PasswordInput register={register} watch={watch} control={control} />
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
      <SignUpModal
        isFinishOpen={isFinishOpen}
        setIsFinishOpen={setIsFinishOpen}
        isEmailOpen={isEmailOpen}
        setIsEmailOpen={setIsEmailOpen}
      />
      {isLoading && <Loader />}
    </>
  );
}
