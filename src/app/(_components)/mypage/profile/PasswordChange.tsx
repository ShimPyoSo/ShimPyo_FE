'use client';

import { useForm, useFormState } from 'react-hook-form';

import { IPasswordChange } from '@/app/(_utils)/type';
import PasswordInput from './PasswordInput';
import axios from 'axios';

export default function PasswordChange() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IPasswordChange>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isValid } = useFormState({ control });

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
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">비밀번호 변경</h3>
        <p
          className={
            errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.' ||
            errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.'
              ? 'text-r'
              : `text-g1`
          }
        >
          {errors.password?.message === '비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.'
            ? '비밀번호를 양식에 맞춰 다시 설정해 주세요'
            : errors.passwordConfirm?.message === '비밀번호가 일치하지 않습니다.'
            ? '비밀번호가 일치하지 않아요'
            : '8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요'}
        </p>
        <PasswordInput register={register} watch={watch} errors={errors} />
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
