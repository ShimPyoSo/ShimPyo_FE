'use client';

import { IError, IPasswordChange } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { useForm, useFormState } from 'react-hook-form';

import PasswordDescription from './PasswordDescription';
import PasswordInput from './PasswordInput';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useState } from 'react';

interface PasswordChangeProps {
  setIsPasswordAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordChange({ setIsPasswordAlert }: PasswordChangeProps) {
  const { register, handleSubmit, watch, trigger, control } = useForm<IPasswordChange>({
    mode: 'onBlur',
  });
  const { isValid } = useFormState({ control });

  const { handleAccessExpired } = useHandleTokenExpired();
  const [isPasswordError, setIsPasswordError] = useState(false);

  const onSubmit = async (data: IPasswordChange) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/password`,
        {
          nowPassword: data.nowPassword,
          newPassword: data.password,
          checkNewPassword: data.passwordConfirm,
        },
        { withCredentials: true }
      );
      setIsPasswordAlert(true);
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'PASSWORD_NOT_MATCHED') {
        setIsPasswordError(true);
      } else if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/password`,
            {
              nowPassword: data.nowPassword,
              newPassword: data.password,
              checkNewPassword: data.passwordConfirm,
            },
            { withCredentials: true }
          );
          setIsPasswordAlert(true);
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-sm text-b1 font-semibold tracking-[-0.02em]">비밀번호 변경</h3>
        <PasswordDescription control={control} />
        <PasswordInput
          register={register}
          watch={watch}
          control={control}
          trigger={trigger}
          isPasswordError={isPasswordError}
        />
        <button
          className={`mt-[16px] border px-[12px] py-[8px] rounded-md ${
            isValid ? 'text-white bg-gn1 border-gn4' : 'text-g4 bg-w3 border-w4'
          }`}
        >
          변경하기
        </button>
      </form>
    </section>
  );
}
