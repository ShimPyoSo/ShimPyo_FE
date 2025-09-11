'use client';

import { IAdditional, IError } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';
import { useForm, useFormState } from 'react-hook-form';

import BirthYearInput from './BirthYearInput';
import GenderInput from './GenderInput';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useRouter } from 'next/navigation';

export default function AdditionalForm() {
  const { register, handleSubmit, watch, control } = useForm<IAdditional>({ mode: 'onBlur' });
  const { isValid } = useFormState({ control });
  const router = useRouter();
  const { handleAccessExpired } = useHandleTokenExpired();

  const onSubmit = async (data: IAdditional) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/info`,
        {
          gender: data.gender,
          birthYear: Number(data.birthYear),
        },
        { withCredentials: true }
      );
      router.push('/');
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        await handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/info`,
            {
              gender: data.gender,
              birthYear: Number(data.birthYear),
            },
            { withCredentials: true }
          );
          router.push('/');
        } catch {
          // reissue 후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <form className="h-full relative" onSubmit={handleSubmit(onSubmit)}>
      <BirthYearInput register={register} control={control} />
      <GenderInput register={register} control={control} watch={watch} />

      <button
        type="submit"
        className={`absolute bottom-0 mb-[32px] w-full py-[16px] rounded-lg border font-semibold ${
          isValid ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
        } `}
      >
        저장하기
      </button>
    </form>
  );
}
