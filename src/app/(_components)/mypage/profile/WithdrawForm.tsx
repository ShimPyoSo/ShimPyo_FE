'use client';

import { useForm, useFormState } from 'react-hook-form';

import CheckBox from '../../UI/Checkbox';
import { IWithdraw } from '@/app/(_utils)/type';
import PasswordCheck from '../../user/PasswordCheck';
import axios from 'axios';
import { useState } from 'react';

export default function WithdrawForm() {
  const { register, watch, handleSubmit, control } = useForm<IWithdraw>();
  const { isValid } = useFormState({ control });
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const onSubmit = async (data: IWithdraw) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage`, {
        data: { password: data.password },
        withCredentials: true,
      });
    } catch {
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
        <CheckBox register={register} watch={watch} name={'isConfirmed'} />
        <span className="text-xs text-b3">모든 사항을 꼼꼼히 읽었으며 탈퇴에 동의해요</span>
      </label>

      <button
        className={`mt-[16px] border px-[12px] py-[8px] rounded-md ${
          isValid ? 'text-white bg-gn1 border-gn4' : 'text-g4 bg-w3 border-w4'
        }`}
      >
        탈퇴하기
      </button>
    </form>
  );
}
