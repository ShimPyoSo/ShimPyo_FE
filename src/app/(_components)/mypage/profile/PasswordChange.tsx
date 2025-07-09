'use client';

import { useForm, useFormState } from 'react-hook-form';

import { IPasswordChange } from '@/app/(_utils)/type';
import PasswordInput from './PasswordInput';
import axios from 'axios';

export default function PasswordChange() {
  const { register, handleSubmit, control, watch } = useForm<IPasswordChange>();
  const { isValid } = useFormState({ control });

  const onSubmit = async (data: IPasswordChange) => {
    try {
      await axios.put('/password', {
        nowPassword: data.nowPassword,
        newPassword: data.password,
        checkNewPassword: data.passwordConfirm,
      });
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">비밀번호 변경</h3>
      <p className="text-g1">8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput register={register} watch={watch} />
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
