'use client';

import { IError, IWithdraw } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import CheckBox from '../../UI/Checkbox';
import PasswordCheck from '../../user/PasswordCheck';
import { useForm } from 'react-hook-form';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useState } from 'react';

export default function WithdrawForm() {
  const { register, watch, handleSubmit } = useForm<IWithdraw>({
    mode: 'onBlur',
  });
  const { handleAccessExpired } = useHandleTokenExpired();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const values = watch();
  const canSubmit = !!values.password && !!values.isConfirmed;

  const onSubmit = async (data: IWithdraw) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth`, {
        data: { password: data.password },
        withCredentials: true,
      });
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'PASSWORD_NOT_MATCHED') {
        setIsFailed(true);
      } else if (err.response?.data?.name === 'INVALID_TOKEN') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth`, {
            data: { password: data.password },
            withCredentials: true,
          });
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);

      setIsFailed(true);
    }
  };

  return (
    <form className="mt-[32px]" onSubmit={handleSubmit(onSubmit)}>
      <label className="text-sm text-b1 font-semibold tracking-[-2%]">비밀번호 확인</label>
      <div className="mt-[12px] relative">
        <input
          className={`w-full bg-white border px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none placeholder:text-g3 ${
            isFailed ? 'border-r' : 'border-w4'
          }`}
          type={passwordOpen ? 'text' : 'password'}
          placeholder="현재 비밀번호를 입력해 주세요"
          {...register('password', {
            required: '현재 비밀번호는 필수 입력입니다.',
          })}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        <PasswordCheck isFocused={isPasswordFocused} isOpen={passwordOpen} setIsOpen={setPasswordOpen} marginTop={10} />
      </div>
      {isFailed && <p className="mt-[8px] text-r text-xs tracking-[-2%]">비밀번호를 다시 입력해 주세요</p>}
      <label className="mt-[32px] flex items-center space-x-2 cursor-pointer">
        <CheckBox register={register} watch={watch} name={'isConfirmed'} required={true} />
        <span className="text-xs text-b3">모든 사항을 꼼꼼히 읽었으며 탈퇴에 동의해요</span>
      </label>

      <button
        className={`mt-[16px] border px-[12px] py-[8px] rounded-md ${
          canSubmit ? 'text-white bg-gn1 border-gn4' : 'text-g4 bg-w3 border-w4'
        }`}
      >
        탈퇴하기
      </button>
    </form>
  );
}
