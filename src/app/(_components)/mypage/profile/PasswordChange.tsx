'use client';

import { IError, IPasswordChange } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { useForm, useFormState } from 'react-hook-form';

import PasswordInput from './PasswordInput';
import { useLogout } from '@/app/(_utils)/hooks/useLogout';
import { useState } from 'react';

export default function PasswordChange() {
  const { register, handleSubmit, watch, trigger, control } = useForm<IPasswordChange>({
    mode: 'onBlur',
  });
  const { errors, isValid } = useFormState({ control });
  const { handleLogout } = useLogout();
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
      handleLogout();
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'PASSWORD_NOT_MATCHED') {
        setIsPasswordError(true);
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">비밀번호 변경</h3>
        <p
          className={
            errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.' ||
            errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.' ||
            errors.password?.message === '기존 비밀번호로 변경할 수 없습니다.'
              ? 'text-r'
              : `text-g1`
          }
        >
          {errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
            ? '비밀번호를 양식에 맞춰 다시 설정해 주세요'
            : errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.'
            ? '비밀번호가 일치하지 않아요'
            : errors.password?.message === '기존 비밀번호로 변경할 수 없습니다.'
            ? '기존 비밀번호와 다른 비밀번호를 입력해 주세요.'
            : '8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요'}
        </p>
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
